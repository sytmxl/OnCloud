<template>
  <div>
    <!-- <h2>操作工作负载</h2> -->
    <el-form class="" ref="form" :model="formDataParam" label-width="120px">
      <el-form-item label="方式">
        <el-radio-group v-model="method" class=" rounded-full">
          <el-radio-button label="param">使用选项</el-radio-button>
          <el-radio-button label="yaml">使用yaml</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <!-- param form -->
    <el-form v-if="method == 'param'" class="pb-6" ref="form" :model="formDataParam" label-width="120px">
      <el-form-item v-if="type == 'create'" label="名称" prop="name">
        <el-input v-model="formDataParam.name" required placeholder="name"></el-input>
      </el-form-item>

      <el-form-item v-if="type == 'create'" label="命名空间" prop="namespace">
        <el-input v-model="formDataParam.namespace" required placeholder="namespace"></el-input>
      </el-form-item>

      <el-form-item label="镜像" prop="image">
        <el-input v-model="formDataParam.image" required placeholder="image"></el-input>
      </el-form-item>

      <el-form-item label="副本数" prop="replicas">
        <el-input-number v-model="formDataParam.replicas" required placeholder="replicas"></el-input-number>
      </el-form-item>

      <el-form-item label="环境变量名称" prop="environment_names">
        <el-input v-model="formDataParam.environment_names" placeholder="environment_names"></el-input>
      </el-form-item>

      <el-form-item label="环境变量值" prop="environment_values">
        <el-input v-model="formDataParam.environment_values" placeholder="environment_values"></el-input>
      </el-form-item>

      <el-form-item label="容器端口" prop="container_ports">
        <el-input v-model="formDataParam.container_ports" placeholder="container_ports"></el-input>
      </el-form-item>

      <el-form-item label="标签键" prop="label_keys">
        <el-input v-model="formDataParam.label_keys" placeholder="label_keys"></el-input>
      </el-form-item>

      <el-form-item label="标签值" prop="label_values">
        <el-input v-model="formDataParam.label_values" placeholder="label_values"></el-input>
      </el-form-item>

      <el-button class=" float-right" type="primary" @click="createWorkloadParam">提交</el-button>
    </el-form>

    <!-- yaml form -->
    <el-form
      v-else
      :model="formDataYaml"
      label-width="120px"
      ref="form"
      v-loading="loading"
      class="pb-6"
    >
      <el-form-item label="yaml文件">
        <input type="file" accept=".yaml"  @change="handleFileChange">
      </el-form-item>
      <el-form-item v-if="type == 'update'" label="名称" prop="name">
        <el-input v-model="formDataYaml.name" required placeholder="name"></el-input>
      </el-form-item>

      <el-form-item label="命名空间" prop="namespace">
        <el-input v-model="formDataYaml.namespace" required placeholder="namespace"></el-input>
      </el-form-item>

      <el-button class=" float-right" type="primary" @click="createWorkloadYaml">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    type: String,
    name: String,
    namespace: String
  },
  data() {
    return {
      method: 'param',
      formDataParam: {
        name: "",
        namespace: "",
        image: "",
        replicas: 0,
        environment_names: "",
        environment_values: "",
        container_ports: "",
        label_keys: "",
        label_values: "",
      },
      formDataYaml: {
        name: "",
        namespace: "",
        config: null
      },
      loading: false,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  },
  methods: {
    handleFileChange(event) {
      this.formDataYaml.config = event.target.files[0];
    },
    createWorkloadParam() {
      axios.post(this.type == 'create' ? '/deployment/param/create' : '/deployment/param/update', this.formDataParam)
        .then(response => {
          const msg = response.data.msg;
          
          if (msg === "create success") {
            this.$message.success('操作成功');
            // 可以在此处执行其他操作，例如刷新工作负载列表等
          }
          else  
            this.$message.error('失败: ' + msg);
        })
        .catch(error => {
          this.$message.error('失败: ' + error);
        });
    },
    createWorkloadYaml() {
      if (!this.formDataYaml.config || this.formDataYaml.config == undefined) {
        this.$message.error('请选择要上传的文件');
        return;
      }
      axios.post(this.type == 'create' ? '/deployment/yml/create' : '/deployment/yml/update', this.formDataYaml)
        .then(response => {
          const msg = response.data.msg;
          
          if (msg === "create success") {
            this.$message.success('操作成功');
            // 可以在此处执行其他操作，例如刷新工作负载列表等
          }
          else  
            this.$message.error('失败: ' + msg);
        })
        .catch(error => {
          this.$message.error('失败: ' + error);
        });
    },
  },
};
</script>
