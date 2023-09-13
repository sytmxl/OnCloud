<template>
  <div class=" min-h-full" @click="editing = null">
    <div class="flex flex-col surface-variant p-4 rounded-3xl gap-1 " >
      <transition-group name="fade">
        <li v-for="todo in sortedTodos()" :key="todo.id" class="flex items-center justify-between h-8 todo">
          <div class="flex items-center">
            <input class="checkbox mr-2 surface" type="checkbox" v-model="todo.checked" @change="toggleTodoChecked(todo)">
            <span class=" cursor-pointer" v-if="editing != todo.id" @click.stop="startEditing(todo)">{{ todo.content.replace(/\s*\d*\s*\d*\s*$/, '') }}</span>
            <input v-else type="text" class="surface p-1 px-2 flex-1 rounded-lg" v-model="todo.content" @click.stop="" @blur="saveEditing(todo)" @keyup.enter="saveEditing(todo)">
          </div>
          <div class="items-center lg:hidden func">
            {{ getRelativeDate(todo.date) }} {{ todo.repeat == 0 ? '' : todo.repeat }}
            <el-button class="ml-2" @click.stop="deleteTodo(todo.id)"><span class="material-icons-outlined">delete</span></el-button>
          </div>
        </li>
      </transition-group>
    </div>
    <div class="flex w-full mt-4">
      <input type="text" placeholder="+" v-model="newContent" @blur="createTodo" @keypress.enter="createTodo" class="surface-variant rounded-full px-4 py-2 w-full " />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      todos: [],
      newContent: '',
      editing: null,
    };
  },
  created() {
    this.fetchTodos();
  },
  computed: {
    
  },
  methods: {
    sortedTodos() {
      return this.todos.slice().sort((a, b) => {
        // Sort by checked status first, then by time
        return (a.checked - b.checked) || (new Date(a.date) - new Date(b.date));
      });
    },
    fetchTodos() {
      axios.get('/todos/')
        .then(response => {
          this.todos = response.data;
        })
        .catch(error => {
          console.error('Error fetching todos:', error);
        });
    },
    toggleTodoChecked(todo) {
      this.update(todo.id, {checked: todo.checked}) // request after input change
    },
    createTodo() {
      if (this.newContent == '') return
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      const day = String(today.getDate()).padStart(2, '0');
      const newTodo = {
        content: this.newContent,
        date: `${year}-${month}-${day}`, // Today's date in YYYY-MM-DD format
      };
      this.newContent = ''
      axios.post('/todos/create/', newTodo)
        .then(response => {
          this.todos.push(response.data);
        })
        .catch(error => {
          console.error('Error creating todo:', error);
        });
    },
    deleteTodo(todoId) {
      axios.delete(`/todos/delete/${todoId}/`)
        .then(() => {
          this.todos = this.todos.filter(todo => todo.id !== todoId);
        })
        .catch(error => {
          console.error('Error deleting todo:', error);
        });
    },
    startEditing(todo) {
      this.editing = todo.id
      todo.before = {...todo} // save copy of former for comparison later
    },
    saveEditing(todo) {
      this.editing = null
      var later = this.analyzeInput(todo.content)
      later.content = todo.content

      // simplify todo edit changes, avoid useless data and request
      const differentItems = {};

      for (const key in later) 
        if (todo.before[key] !== later[key]) 
          todo[key] = differentItems[key] = later[key]; // extract difference and update fe data

      if (Object.keys(differentItems).length !== 0) this.update(todo.id, differentItems)
    },
    async update(todoId, patchData) {
      // const patchDataExample = {
      //   repeat: 3,
      //   checked: true,
      //   content: 'content',
      //   date: new Date()
      // };
      return axios.patch(`/todos/update/${todoId}/`, patchData)
        .catch(error => {
          ElMessage.error('Error updating todo:', error);
        });
    },
    analyzeInput(input) {
      const output = {};

      const extractDate = (month, day) => {
        const now = new Date();
        var currentYear = now.getFullYear();
        if (new Date(currentYear, parseInt(month) - 1, parseInt(day) + 1) < now) currentYear += 1
        return new Date(currentYear, parseInt(month) - 1, parseInt(day) + 1).toISOString().substr(0, 10);
      };

      const extractDayOfMonth = (day) => {
        const now = new Date();
        var currentYear = now.getFullYear();
        var currentMonth = now.getMonth();
        if (now.getDate() > parseInt(day) + 1) currentMonth = currentMonth + 1 // next month if passed
        return new Date(currentYear, currentMonth, parseInt(day) + 1).toISOString().substr(0, 10);
      };

      const today = new Date().toISOString().substr(0, 10)
      
      // Case: <space><space>: daily
      const case3Pattern = /\s{2}$/;
      if (case3Pattern.test(input)) {
        output.repeat = 1;
        output.date = today;
        return output;
      }

      // Case: <space><space><num>: repeat of n days
      const case4Pattern = /\s{2}(\d+)$/;
      if (case4Pattern.test(input)) {
        const [, repeat] = input.match(case4Pattern);
        output.repeat = parseInt(repeat);
        output.date = today;
        return output;
      }

      // Case: <space><num><space><num>: month and day
      const case1Pattern = /\s(\d+)\s(\d+)$/;
      if (case1Pattern.test(input)) {
        const [, month, day] = input.match(case1Pattern);
        output.date = extractDate(month, day);
        return output;
      }

      // Case: <space><num>: day of this month or next month if passed
      const case2Pattern = /\s(\d+)$/;
      if (case2Pattern.test(input)) {
        const [, day] = input.match(case2Pattern);
        output.date = extractDayOfMonth(day);
        return output;
      }

      // Case: <none>: today
      const case5Pattern = /\s{0}$/;
      if (case5Pattern.test(input)) {
        output.date = today;
        return output;
      }

      // Default: Invalid input
      return null;
    },
    getRelativeDate(inputDate) {
      const currentDate = new Date();
      const dateTime = new Date(inputDate);
      const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      const dateTimeWithoutTime = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

      const timeDifference = dateTimeWithoutTime - currentDateWithoutTime;
      const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      
      if (daysDifference === 0) {
        return '今天';
      } else if (daysDifference === 1) {
        return '明天';
      } else if (daysDifference === -1) {
        return '昨天';
      } else if (daysDifference > 0 && daysDifference < 30) {
        return `${daysDifference}天后`;
      } else if (daysDifference < 0 && daysDifference > -30) {
        return `${-daysDifference}天前`;
      } else {
        const options = { month: 'long', day: 'numeric' };
        return dateTime.toLocaleDateString('zh-CN', options);
      }
    },
  },
};
</script>
<style lang="scss">
.todo:hover {
  .func {
    @apply block
  }
}
</style>
