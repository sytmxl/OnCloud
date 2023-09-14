<template>
  
  <el-card>
    <!-- <h1>Images</h1> -->
    <el-table size="large" :data="imageList" :stripe="true">
      <el-table-column label="仓库" prop="repository"></el-table-column>
      <el-table-column label="标签" prop="tag"></el-table-column>
      <el-table-column label="大小" prop="size"></el-table-column>
      <el-table-column label="创建时间" prop="created"></el-table-column>
      <el-table-column label="" align="right">
        <template #default="scope">
          <el-button type="danger" size="small" @click="deleteImage(scope.row)">删除</el-button>
          <el-button type="primary" size="small" @click="showEditDialog(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    

    <!-- Edit Image Dialog -->
    <el-dialog title="修改镜像" v-model="editDialogVisible">
      <!-- Form for editing an image -->
      <el-form :model="editImage" label-width="120px">
        <el-form-item label="仓库">
          <el-input v-model="editImage.repository"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="editImage.tag"></el-input>
        </el-form-item>
        <el-form-item label="大小">
          <el-input v-model="editImage.size"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="editImage.created"></el-input>
        </el-form-item>
      </el-form>

      <!-- Dialog buttons -->
      <div slot="footer" class="dialog-footer flex w-full  flex-row-reverse gap-1">
        <el-button type="primary" @click="updateImage">保存</el-button>
        <el-button @click="editDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  props: {
    imageList: Array
  },
  data() {
    return {
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
