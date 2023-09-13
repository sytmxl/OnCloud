<template>
  <div class="flex flex-col h-full p-6 pr-2 pt-2 max-w-full  surface overflow-scroll rounded-l-3xl relative" style="width: 450px;">
    <div class="sticky top-2 right-2 w-full">
      <label for="notification" class="btn btn-square btn-ghost float-right" >
        <span class="material-icons-outlined">close</span>
      </label>
    </div>
    <div v-if="username !== null" class=" flex flex-col gap-2">
      <div class="title items-center align-middle primary-text text-3xl">Hello, {{ username }}, <br/> 祝你今天开心～
        <label class="btn btn-square btn-ghost surface" @click="logout">
          <span class="material-icons-outlined">logout</span>
        </label>
      </div>
      <!-- <div class="flex justify-end w-full mt-4 gap-1">
        <el-button class="" type="primary" @click="deleteCookie">清除cookie</el-button>
      </div> -->
      <div class="title">互动通知</div>
      <notice-items :input="notices"></notice-items>
    </div>
    <div v-else>
      <div class="title">登录</div>
      <login></login>
      <div class="primary p-2 rounded-lg">自由注册暂不开放，请联系站主（微信号：mosymosyy）
      </div>
      <!-- <div class="title">注册</div>
      <Register /> -->
      <!-- <el-button class=" float-right mt-4" type="primary" @click="deleteCookie">清除cookie</el-button> -->
    </div>
    
  </div>
</template>

<script>
import NoticeItems from '@/components/NoticeItems.vue'
import { ElMessage } from 'element-plus'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import axios from 'axios';
export default {
  components: {
    NoticeItems,
    Login,
    Register,
  },
  data() {
    return {
      notices: [],
      checktime: new Date(),
      username: localStorage.getItem('username')
    }
  },
  mounted() {
    // this.fetchNotice()
    
  },
  methods: {
    fetchNotice() {
      axios.get('/get_unread_notice/')
        .then(response => {
          this.notices = response.data;
          console.log(this.notices)
        })
        .catch(error => {
          console.error('Error fetching notices:', error);
        });
    },
    clearAllCookies() {
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    },
    showLoginDialog() {
      this.loginDialogVisible = true;
    },
    showRegisterDialog() {
      this.registerDialogVisible = true;
    },
    logout() {
      this.clearAllCookies();
      axios.post('/auth/logout/')  // Replace with your backend logout endpoint
      .then(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.username = null;
        axios.defaults.headers.common['Authorization'] = `Token None`
        // Handle successful logout response
        ElMessage.success('退出登录成功');
        location.reload()
      })
      .catch(error => {
        // Handle logout error
        console.error(error);
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.title {
  @apply text-xl font-semibold my-4
}
</style>
