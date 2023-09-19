<template>
  <div class="gap-2 flex flex-col w-full">
    <div v-for="(value, index) in values" class="flex items-center gap-2" :key="index">
      <el-input v-model="values[index]"></el-input>
      <el-button @click="removeItem(index)" type="danger">x</el-button>
      <el-button v-if="index == values.length - 1" class="w-fit float-right" @click="addItem" type="primary">添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    values: Array, // Array of values for the input fields
  },
  methods: {
    addItem() {
      this.values.push(''); // Add a new input field
    },
    removeItem(index) {
      this.values.splice(index, 1); // Remove the input field at the specified index
    }
  }
};
</script>
