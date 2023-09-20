<template>
  <el-form v-if="type == 'create'" class="" ref="form" label-width="100px">
    <el-form-item label="方式">
      <el-radio-group v-model="method" class=" rounded-full">
        <el-radio-button label="file">使用Dockerfile</el-radio-button>
        <el-radio-button label="repo">从仓库拉取</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>

  <el-form
    v-if="method == 'file'"
    :model="formData"
    label-width="100px"
    ref="dockerForm"
    v-loading="loading"
    class="surface-variant p-4 pb-1 rounded-3xl"
  >
    <el-form-item label="Dockerfile">
      <input type="file" accept=".zip"  @change="handleFileChange">
    </el-form-item>
    <el-form-item label="标签">
      <el-input v-model="formData.tag" placeholder="请输入标签"></el-input>
    </el-form-item>
  </el-form>
  <el-form
    v-else
    :model="formDataRepo"
    label-width="100px"
    ref="dockerForm"
    class="surface-variant p-4 pb-1 rounded-3xl"
  >
    <el-form-item label="仓库">
      <el-input v-model="formDataRepo.repository" v-loading="loading" ></el-input>
    </el-form-item>
  </el-form>
  <div class="flex flex-row-reverse mt-4">
    <el-button v-if="method == 'file'" class="" type="primary" v-loading="loading" @click="submitForm('dockerForm')">上传</el-button>
    <el-button v-else type="primary" @click="submitFormRepo()">提交</el-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    imageList: Array,
    type: String,
    imageId: String
  },
  data() {
    return {
      formData: {
        tag: '',
      },
      formDataRepo: {
        repository: 'docker.io/library/alpine:latest',
      },
      loading: false,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      selectedFile: null,
      method: 'file'
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    submitFormRepo() {
      this.loading = true
      axios.post('/image/pull', this.formDataRepo)
        .then(response => {
          if (response.data.msg == "pull success") {
            this.$message.success('拉取成功，请等待创建加载');
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
          formData.append('image_id', this.imageId)

          axios.post(this.type == 'create' ? '/image/build' : '/image/update', formData, { headers: { 'Content-Type': 'multipart/form-data' }, })
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
