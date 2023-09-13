<template>
  <div>
    <h1>Docker Images</h1>
    
    <!-- Tab Buttons -->
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Public Images" name="public">
        <ImageList :image-list="imageList"></ImageList>
      </el-tab-pane>

      <el-tab-pane label="Private Images" name="private">
        <ImageList :image-list="imageList"></ImageList>
      </el-tab-pane>
    </el-tabs>
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
      activeTab: 'public',
      imageList: [
        { id: 1, repository: 'nginx', tag: 'latest', size: '126MB', created: '2 days ago' },
        { id: 2, repository: 'ubuntu', tag: '20.04', size: '69.5MB', created: '1 week ago' },
        { id: 3, repository: 'mysql', tag: '5.7', size: '487MB', created: '3 weeks ago' },
        { id: 4, repository: 'redis', tag: '6.0', size: '98.6MB', created: '4 weeks ago' },
        { id: 5, repository: 'node', tag: '14', size: '248MB', created: '1 month ago' },
        // Add more image objects here with relevant information
      ],
      publicImageList: [
        // Public image data
      ],
      privateImageList: [
        // Private image data
      ],
      createDialogVisible: false,
      editDialogVisible: false,
      newImage: {
        repository: '',
        tag: '',
        size: '',
        created: '',
      },
      editImage: {
        id: 0,
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
    showEditDialog(image) {
      this.editImage = { ...image };
      this.editDialogVisible = true;
    },
    createImage() {
      // Add validation and API call to create a new image
      this.imageList.push({ ...this.newImage, id: this.imageList.length + 1 });
      this.createDialogVisible = false;
    },
    updateImage() {
      // Add validation and API call to update the image
      const index = this.imageList.findIndex((image) => image.id === this.editImage.id);
      if (index !== -1) {
        this.imageList[index] = { ...this.editImage };
        this.editDialogVisible = false;
      }
    },
    deleteImage(image) {
      // Add API call to delete the image
      const index = this.imageList.findIndex((img) => img.id === image.id);
      if (index !== -1) {
        this.imageList.splice(index, 1);
      }
    },
  },
};
</script>
