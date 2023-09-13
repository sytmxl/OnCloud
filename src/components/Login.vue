<template>
  <div class="">
    <el-form @keydown.enter="submitForm" ref="form" :model="form" max-width="120px" class="login-form">
      <el-form-item label="实名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="flex justify-end w-full">
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },

  methods: {
    submitForm() {
      axios.defaults.headers.common['X-CSRFToken'] = undefined;
      axios.post('/auth/login/', this.form, {
          withCredentials: false,
        })
        .then((response) => {
          // console.log(response)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.username)
          axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`
          this.$router.push('/gallery')
          location.reload()
        })
        .catch((error) => {
          ElMessage.error(error)
          console.error(error)
        })
    },
  },
}
</script>

<style scoped>

</style>
