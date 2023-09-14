<template>
  <div class="p-2">
    <div class="flex justify-between p-4">
      <div class="flex gap-4">
        <h1>镜像</h1>
        <el-radio-group v-model="activeTab" class=" rounded-full">
          <el-radio-button label="private">个人镜像</el-radio-button>
          <el-radio-button label="public">公共镜像</el-radio-button>
        </el-radio-group>
      </div>
      <el-button type="primary" @click="showCreateDialog">创建</el-button>
    </div>
    
    <!-- Tab Buttons -->
    <ImageList v-if="activeTab == 'private'" :image-list="privateImageList"></ImageList>
    <ImageList v-if="activeTab == 'public'" :image-list="publicImageList"></ImageList>

    <!-- Create Image Dialog -->
    <el-dialog title="创建新镜像" v-model="createDialogVisible">
      <!-- Form for creating a new image -->
      <el-form :model="newImage" label-width="80px">
        <el-form-item label="仓库">
          <el-input v-model="newImage.repository"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="newImage.tag"></el-input>
        </el-form-item>
        <el-form-item label="大小">
          <el-input v-model="newImage.size"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="newImage.created"></el-input>
        </el-form-item>
      </el-form>

      <!-- Dialog buttons -->
      <div slot="footer" class="dialog-footer flex w-full  flex-row-reverse gap-1">
        <el-button type="primary" @click="createImage">创建</el-button>
        <el-button @click="createDialogVisible = false">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImageList from '@/components/ImageList.vue';
export default {
  components: {
    ImageList
  },
  data() {
    return {
      activeTab: 'private',
      publicImageList: [
        { id: 1, repository: 'nginx', tag: 'latest', size: '126MB', created: '2 days ago' },
        { id: 2, repository: 'ubuntu', tag: '20.04', size: '69.5MB', created: '1 week ago' },
        { id: 3, repository: 'mysql', tag: '5.7', size: '487MB', created: '3 weeks ago' },
        { id: 4, repository: 'redis', tag: '6.0', size: '98.6MB', created: '4 weeks ago' },
        { id: 5, repository: 'node', tag: '14', size: '248MB', created: '1 month ago' },
      ],
      privateImageList: [
        { id: 1, repository: 'nginx', tag: 'latest', size: '126MB', created: '2 days ago' },
        { id: 2, repository: 'ubuntu', tag: '20.04', size: '69.5MB', created: '1 week ago' },
      ],
      createDialogVisible: false,
      newImage: {
        repository: '',
        tag: '',
        size: '',
        created: '',
      },
    };
  },
  methods: {
    showCreateDialog() {
      this.createDialogVisible = true;
    },
    createImage() {
      // Add validation and API call to create a new image
      this.imageList.push({ ...this.newImage, id: this.imageList.length + 1 });
      this.createDialogVisible = false;
    },
  },
};
</script>
<style scoped>
/* h1 {
  font-family: Google Sans, sans-serif
} */
</style>
