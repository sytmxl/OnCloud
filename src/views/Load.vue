<template>
  <div class="p-2 w-full">
    <el-dialog title="创建新工作负载" v-model="createDialogVisible" >
      <!-- Create Workload Form -->
      <el-card>
        <!-- <h2>Create New Workload</h2> -->
        <el-form ref="createForm" :model="newWorkload" label-position="top">
          <el-form-item label="名称">
            <el-input v-model="newWorkload.name"></el-input>
          </el-form-item>
          <el-form-item label="镜像">
            <el-input v-model="newWorkload.image"></el-input>
          </el-form-item>
          <el-form-item label="端口">
            <el-input v-model="newWorkload.port"></el-input>
          </el-form-item>
          <el-form-item label="环境变量">
            <el-input v-model="newWorkload.env"></el-input>
          </el-form-item>
          <el-button type="primary" class="" @click="createWorkload">创建</el-button>
        </el-form>
      </el-card>
    </el-dialog>
    <div class="flex justify-between p-4">
      <h1>工作负载管理</h1>
      <el-button type="primary" @click="showCreateDialog">创建</el-button>
    </div>
    
    <!-- Workload List -->
    <el-card>
      <!-- <h2>工作负载</h2> -->
      <el-table size="large" :data="workloads" >
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="镜像" prop="image"></el-table-column>
        <el-table-column label="端口" prop="port"></el-table-column>
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
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newWorkload: {
        name: '',
        image: '',
        port: '',
        env: '',
      },
      createDialogVisible: false,
      workloads: [
        {
          "name": "WebAppFrontend",
          "image": "nginx:latest",
          "port": "80",
          "env": "DB_HOST=db.example.com,DB_PORT=5432"
        },
        {
          "name": "DatabaseServer",
          "image": "mysql:5.7",
          "port": "3306",
          "env": "MYSQL_ROOT_PASSWORD=secretpassword"
        },
        {
          "name": "WorkerService",
          "image": "node:14",
          "port": "3000",
          "env": "API_KEY=yourapikey,DEBUG=true"
        },
        {
          "name": "CacheServer",
          "image": "redis:6.0",
          "port": "6379",
          "env": "CACHE_SIZE=512MB"
        }
      ]
      , // List of workloads
    };
  },
  methods: {
    showCreateDialog() {
      this.createDialogVisible = true;
      // console.log(this.createDialogVisible)
    },
    createWorkload() {
      // Send a POST request to your API to create a new workload
      // Update the 'workloads' data property with the new workload
      // Clear the form fields
    },
    deleteWorkload(workload) {
      // Send a DELETE request to your API to delete the selected workload
      // Remove the workload from the 'workloads' data property
    },
    editWorkload(workload) {
      // Show an edit dialog to update workload details (similar to create)
      // Send a PUT request to your API to update the workload
      // Update the 'workloads' data property with the edited workload
    },
    // Fetch workloads from your API and populate the 'workloads' data property
  },
  created() {
    // Fetch initial list of workloads when the page is loaded
  },
};
</script>

<style>
/* Add custom styles here if needed */
</style>
