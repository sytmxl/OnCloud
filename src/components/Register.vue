<template>
  <div class="register">
    <el-form ref="form" :model="form" max-width="120px" class="register-form">
      <div class="primary p-2 rounded-lg">请使用实名和真实电话号码注册，认不出来的可能会被清理
        <br/>密码存和传都是加密的 问题不大（用个简单点的也行）
      </div>
      <div class="mb-4"></div>
      <el-form-item label="实名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone_number"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="flex justify-end w-full">
          <el-button class="" type="primary" @click="submitForm">注册</el-button>
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
  name: 'Register',

  data() {
    return {
      form: {
        username: '',
        password: '',
        phone_number: '',
      },
    }
  },

  methods: {
    isChineseString(str) {
      // 使用正则表达式匹配中文字符
      var regex = /^[\u4e00-\u9fa5]{2,5}$/
      return regex.test(str)
    },
    submitForm() {
      if (!this.isChineseString(this.form.username)) {
        ElMessage.error('请正确填写真实姓名')
        return
      }
      if (this.form.phone_number.length != 11) {
        ElMessage.error('请正确填写电话号码')
        return
      }
      axios
        .post('/auth/magic/', this.form)
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.username)
          axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`
          this.$router.push('/gallery')
          location.reload()
          ElMessage.success('注册成功')
        })
        .catch((error) => {
          ElMessage.error(error.response.data.error)
        })
    },
  },
}
</script>

<style scoped>
.register-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
