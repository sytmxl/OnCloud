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
    <el-form v-if="method == 'param'" class="surface-variant p-4 pb-0.5 rounded-3xl" ref="form" :model="formDataParam" label-width="120px">
      <el-form-item v-if="type == 'create'" label="名称" prop="name">
        <el-input v-model="formDataParam.name" placeholder="name"></el-input>
      </el-form-item>

      <el-form-item v-if="type == 'create'" label="命名空间" prop="namespace">
        <el-input v-model="formDataParam.namespace" placeholder="namespace"></el-input>
      </el-form-item>

      <el-form-item label="镜像" prop="image">
        <el-input v-model="formDataParam.image" placeholder="image"></el-input>
      </el-form-item>

      <el-form-item label="副本数" prop="replicas">
        <el-input-number v-model="formDataParam.replicas" placeholder="replicas"></el-input-number>
      </el-form-item>

      <el-form-item label="环境变量名称" prop="environment_names">
        <array-editor :values="formDataParam.environment_names"/>
      </el-form-item>

      <el-form-item label="环境变量值" prop="environment_values">
        <array-editor :values="formDataParam.environment_values"/>
      </el-form-item>

      <el-form-item label="容器端口" prop="container_ports">
        <array-editor :values="formDataParam.container_ports"/>
      </el-form-item>

      <el-form-item label="标签键" prop="label_keys">
        <array-editor :values="formDataParam.label_keys"/>
      </el-form-item>

      <el-form-item label="标签值" prop="label_values">
        <array-editor :values="formDataParam.label_values"/>
      </el-form-item>

      
    </el-form>

    <!-- yaml form -->
    <el-form
      v-else
      :model="formDataYaml"
      label-width="120px"
      ref="form"
      v-loading="loading"
      class="surface-variant p-4 pb-0.5 h-fit rounded-3xl"
    >
      <el-form-item label="yaml文件">
        <input type="file" accept=".yaml"  @change="handleFileChange">
      </el-form-item>
      <el-form-item v-if="type == 'update'" label="名称" prop="name">
        <el-input v-model="formDataYaml.name" required placeholder="name"></el-input>
      </el-form-item>

      <el-form-item class="" label="命名空间" prop="namespace">
        <el-input v-model="formDataYaml.namespace" required placeholder="namespace"></el-input>
      </el-form-item>
    </el-form>
    <div class="flex flex-row-reverse mt-4">
      <el-button v-if="method == 'param'" type="primary" @click="createWorkloadParam">提交</el-button>
      <el-button v-else type="primary" @click="createWorkloadYaml">提交</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ArrayEditor from '@/components/ArrayEditor.vue';
export default {
  props: {
    type: String,
    name: String,
    namespace: String
  },
  components: {
    ArrayEditor,
  },
  data() {
    return {
      method: 'param',
      formDataParam: {
        name: "testflaskapp",
        namespace: "default",
        image: "myflask:0.0.1",
        replicas: 1,
        environment_names: ["env1"],
        environment_values: ["1"],
        container_ports: ["8888"],
        label_keys: ["type"],
        label_values: ["flask1"],
      },
      formDataYaml: {
        name: "test",
        namespace: "default",
        config: null
      },
      loading: false,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  },
  methods: {
    addItem() {
      this.formDataParam.environment_values.push(''); // 添加一个新的输入项
    },
    removeItem(index) {
      this.formDataParam.environment_values.splice(index, 1); // 移除指定索引的输入项
    },
    handleFileChange(event) {
      this.formDataYaml.config = event.target.files[0];
    },
    createWorkloadParam() {
      axios.post(this.type == 'create' ? '/deployment/param/create' : '/deployment/param/update', this.formDataParam, { headers: {'Content-Type': 'multipart/form-data',} })
        .then(response => {
          const msg = response.data.msg;
          
          if (msg === "create success" || msg === "update success") {
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
      axios.post(this.type == 'create' ? '/deployment/yml/create' : '/deployment/yml/update', this.formDataYaml, { headers: {'Content-Type': 'multipart/form-data',} })
        .then(response => {
          const msg = response.data.msg;
          
          if (msg === "create success" || msg === "update success") {
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
