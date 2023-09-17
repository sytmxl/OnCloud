<template>
  <el-form
    :model="formData"
    label-width="100px"
    ref="dockerForm"
    v-loading="loading"
    class="pb-6"
  >
    <el-form-item label="Dockerfile">
      <input type="file" accept=".zip"  @change="handleFileChange">
    </el-form-item>
    <el-form-item label="标签">
      <el-input v-model="formData.tag" placeholder="请输入标签"></el-input>
    </el-form-item>
    <!-- <el-form-item class="flex flex-row-reverse"> -->
      <el-button class=" float-right" type="primary" @click="submitForm('dockerForm')">上传</el-button>
    <!-- </el-form-item> -->
  </el-form>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    imageList: Array
  },
  data() {
    return {
      formData: {
        tag: '',
      },
      loading: false,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      selectedFile: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    submitForm(formName) {
      if (!this.selectedFile || this.selectedFile == undefined) {
        this.$message.error('请选择要上传的文件');
        return;
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const formData = new FormData();
          formData.append('tag', this.formData.tag);
          formData.append('dockerfile', this.selectedFile);

          axios.post('/image/build', formData, { headers: { 'Content-Type': 'multipart/form-data' }, })
            .then(response => {
              if (response.data.msg == "build success") {
                this.$message.success('上传成功，请等待创建加载');
                // reset the form after successful upload
                this.$refs[formName].resetFields();
              }
              else {
                this.$message.error('失败：' + response.data.msg);
              }
              this.loading = false;
            })
            .catch(error => {
              this.$message.error('创建上传失败', error);
              console.error('Error:', error);
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>
