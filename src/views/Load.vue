<template>
  <div class="p-2 w-full">
    <el-dialog title="创建工作负载" v-model="createDialogVisible" >
      <create-or-edit-load type="create"></create-or-edit-load>
    </el-dialog>
    <el-dialog title="修改工作负载" v-model="updateDialogVisible" >
      <create-or-edit-load type="update"></create-or-edit-load>
    </el-dialog>

    <div class="flex justify-between p-4">
      <h1>工作负载管理</h1>
      <el-button type="primary" @click="createDialogVisible = true">创建</el-button>
    </div>
    
    <!-- Workload List -->
    <el-card>
      <!-- <h2>工作负载</h2> -->
      <el-table v-if="!loading" size="large" :data="workloads" >
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="镜像" prop="containers[0].image"></el-table-column>
        <el-table-column label="创建时间" prop="creation_timestamp"></el-table-column>
        <!-- <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button type="danger" @click="deleteWorkload(scope.row)">Delete</el-button>
            <el-button type="primary" @click="editWorkload(scope.row)">Edit</el-button>
          </template>
        </el-table-column> -->
        <el-table-column align="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="搜索名称" />
          </template>
          <template #default="scope">
            <div class="flex gap-2 justify-end">
              <el-button type="primary" size="small" @click="showDetails(scope.row)">详情</el-button>
              <el-button size="small" type="danger" @click="deleteLoad(scope.row)">删除</el-button>
              <el-button size="small" type="primary" @click="updateDialogVisible = true">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="详细信息"
      v-model="detailsDialogVisible"
      class="w-full md:w-1/2 p-4"
    >
      <load-details :detailData="selected" :dialog-visible="detailsDialogVisible"  @close="detailsDialogVisible = false"></load-details>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import LoadDetails from '@/components/LoadDetails.vue'
import CreateOrEditLoad from '@/components/CreateOrEditLoad.vue';
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
    };
  },
  mounted() {
    this.fetchList()
  },
  methods: {
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
      // console.log(this.createDialogVisible)
    },
    showDetails(target) {
      this.selected = target;
      this.detailsDialogVisible = true;
    },
    createWorkload() {
      // Send a POST request to your API to create a new workload
      // Update the 'workloads' data property with the new workload
      // Clear the form fields
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
    edit(workload) {
      // Show an edit dialog to update workload details (similar to create)
      // Send a PUT request to your API to update the workload
      // Update the 'workloads' data property with the edited workload
    },
    // Fetch workloads from your API and populate the 'workloads' data property
  },
};
</script>

<style>
/* Add custom styles here if needed */
</style>
