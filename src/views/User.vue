<template>
  <div class="p-4 max-w-2xl mx-auto">
    <div v-if="username !== null">
      <div :class="title()">用户名</div>
      <div>{{ username }}</div>
      <div class="flex justify-end w-full mt-4 gap-1">
        <el-button class="" type="primary" @click="deleteCookie">清除cookie</el-button>
        <el-button class="" type="primary" @click="logout">退出登录</el-button>
      </div>
    </div>
    <div v-else>
      <div :class="title()">登录</div>
      <login></login>
      <div :class="title()">注册</div>
      <Register />
      <el-button class=" float-right mt-4" type="primary" @click="deleteCookie">清除cookie</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

export default {
  name: 'User',

  components: {
    Login,
    Register,
  },

  data() {
    return {
      username: localStorage.getItem('username'),
      loginDialogVisible: false,
      registerDialogVisible: false,
    }
  },

  methods: {
    title() {
      return "text-xl font-semibold my-4"
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
      })
      .catch(error => {
        // Handle logout error
        console.error(error);
      });
    },
  },
}
</script>

<style scoped>

</style>
