<template>
  <div class="p-2 w-full">
    <el-dialog title="创建工作负载" v-model="createDialogVisible" >
      <create-or-edit-load type="create"></create-or-edit-load>
    </el-dialog>
    <el-dialog title="修改工作负载" v-model="updateDialogVisible" >
      <create-or-edit-load type="update"></create-or-edit-load>
    </el-dialog>
    <el-dialog title="创建NodePort" v-model="portDialogVisible" >
      <el-form class="surface-variant p-4 pb-0.5 rounded-3xl" ref="form" :model="portForm" label-width="80px">
        <el-form-item label="目标端口">
          <el-input v-model="portForm.target_ports"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="portForm.name"></el-input>
        </el-form-item>
        <el-form-item label="命名空间">
          <el-input v-model="portForm.namespace"></el-input>
        </el-form-item>
      </el-form>
      <div class="flex flex-row-reverse mt-4">
        <el-button class="" type="primary" @click="openPort()">提交</el-button>
      </div>
    </el-dialog>

    <div class="flex justify-between p-4">
      <h1>工作负载管理</h1>
      <el-button type="primary" size="large" @click="createDialogVisible = true"><span class="material-icons-outlined">add</span></el-button>
    </div>
    
    <!-- Workload List -->
    <el-card>
      <!-- <h2>工作负载</h2> -->
      <el-table v-if="!loading" size="large" :data="workloads" >
        <el-table-column label="名称" prop="name" min-width="150px"></el-table-column>
        <el-table-column label="镜像" prop="containers[0].image" min-width="300px"></el-table-column>
        <el-table-column label="创建时间" prop="creation_timestamp" min-width="150px">
          <template #default="scope">
            {{ getRelativeDateTime(scope.row.creation_timestamp) }}
          </template>
        </el-table-column>
        <el-table-column label="运行中" prop="available_replicas" min-width="100px"></el-table-column>
        <el-table-column label="NodePort" min-width="150px">
          <template #default="scope">
            <div v-if="scope.row.serve_port != 'null'" class="flex gap-2">
              <!-- {{ scope.row.serve_port }} -->
              <el-button type="primary" size="small" @click="copy(scope.row.serve_port)">复制</el-button>
              <el-button type="danger" size="small" @click="deletePort(scope.row)"><span class="material-icons-outlined">delete</span></el-button>
            </div>
            <el-button v-else type="primary" size="small" @click="preOpenPort(scope.row)"><span class="material-icons-outlined">add</span></el-button>
          </template>
        </el-table-column>
        <el-table-column align="right" min-width="200px">
          <template #header>
            <!-- <el-input v-model="search" size="small" placeholder="搜索名称" /> -->
          </template>
          <template #default="scope">
            <div class="flex gap-2 justify-end">
              <el-button type="primary" size="small" @click="showDetails(scope.row)"><span class="material-icons-outlined">info</span></el-button>
              <el-button size="small" @click="updateDialogVisible = true"><span class="material-icons-outlined">edit</span></el-button>
              <el-button size="small" type="danger" @click="deleteLoad(scope.row)"><span class="material-icons-outlined">delete</span></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="详细信息"
      v-model="detailsDialogVisible"
      class=""
    >
      <load-details :detailData="selected" :dialog-visible="detailsDialogVisible"  @close="detailsDialogVisible = false"></load-details>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import LoadDetails from '@/components/LoadDetails.vue'
import CreateOrEditLoad from '@/components/CreateOrEditLoad.vue';
import { getRelativeDateTime } from '@/utils';
export default {
  components: {
    LoadDetails,
    CreateOrEditLoad
  },
  data() {
    return {
      newWorkload: {
        name: '',
        image: '',
        port: '',
        env: '',
      },
      createDialogVisible: false,
      updateDialogVisible: false,
      workloads: [
      {
            "available_replicas": 1,
            "containers": [
                {
                    "env": [
                        {
                            "name": "POD_NAMESPACE",
                            "value": null
                        }
                    ],
                    "image": "rancher/local-path-provisioner:v0.0.24",
                    "name": "local-path-provisioner"
                }
            ],
            "creation_timestamp": "Thu, 27 Apr 2023 06:58:20 GMT",
            "labels": {
                "objectset.rio.cattle.io/hash": "183f35c65ffbc3064603f43f1580d8c68a2dabd4"
            },
            "name": "local-path-provisioner",
            "namespace": "kube-system",
            "replicas": 1,
            "unavailable_replicas": null
        },
      ],
      loading: true,
      detailsDialogVisible: false,
      portForm: {
        label_keys: [],
        label_values: [],
        target_ports: 30001,
        name: 'flask',
        namespace: 'default'
      },
      portDialogVisible: false
    };
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    getRelativeDateTime(input) {
      return getRelativeDateTime(input)
    },
    fetchList() {
      axios.get('/deployment/list')
        .then((response) => {
          this.workloads = response.data.data;
          this.loading = false
        })
        .catch((error) => {
          console.error('Error fetching user list:', error);
        });
    },
    showCreateDialog() {
      this.createDialogVisible = true;
    },
    showDetails(target) {
      this.selected = target;
      this.detailsDialogVisible = true;
    },
    deleteLoad(load) { 
      axios.post('/deployment/delete', { name: load.name, namespace: load.namespace })
        .then(response => {
          const msg = response.data.msg
          
          if (msg == "delete success") {
            this.$message.success('删除成功');

            const index = this.workloads.findIndex((ld) => ld.name === load.name);
            if (index !== -1) this.workloads.splice(index, 1);
          }
          else  
            this.$message.error('失败: ' + msg);
        })
        .catch(error => {
          this.$message.error('失败', error);
        });
    },
    preOpenPort(image) {
      this.portForm.label_keys = Object.keys(image.labels)
      this.portForm.label_values = this.portForm.label_keys.map(key => image.labels[key]);
      this.portDialogVisible = true
    },
    openPort() {
      axios.post('/service/param/create', this.portForm, { headers: {'Content-Type': 'multipart/form-data',} })
        .then(response => {
          const msg = response.data.msg
          
          if (msg == "create success") {
            this.$message.success('操作成功');
          }
          else  
            this.$message.error('失败: ' + msg);
        })
        .catch(error => {
          this.$message.error('失败', error);
        });
    },
    deletePort(image) {
      axios.post('/service/delete', { name: image.serve_name, namespace: image.namespace }, { headers: {'Content-Type': 'multipart/form-data',} })
        .then(response => {
          const msg = response.data.msg
          
          if (msg == "delete success") {
            this.$message.success('操作成功');
            image.serve_port = 'null'
          }
          else  
            this.$message.error('失败: ' + msg);
        })
        .catch(error => {
          this.$message.error('失败', error);
        });
    },
    copy(textToCopy) {
      // Create a textarea element to copy the text
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);

      // Select and copy the text
      textarea.select();
      document.execCommand("copy");

      // Remove the textarea element
      document.body.removeChild(textarea);

      // Optionally, provide feedback to the user
      this.$message.success("已复制: " + textToCopy);
    }
  },
};
</script>

<style>
/* Add custom styles here if needed */
</style>
