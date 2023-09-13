<template>
  <div>
    <!-- <h1>Images</h1> -->
    <el-button type="primary" @click="showCreateDialog">Create Image</el-button>
    <el-table :data="imageList">
      <el-table-column label="Repository" prop="repository"></el-table-column>
      <el-table-column label="Tag" prop="tag"></el-table-column>
      <el-table-column label="Size" prop="size"></el-table-column>
      <el-table-column label="Created" prop="created"></el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="scope">
          <el-button type="danger"  @click="deleteImage(scope.row)">Delete</el-button>
          <el-button type="primary"  @click="showEditDialog(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Create Image Dialog -->
    <el-dialog title="Create Docker Image" class="z-50" :visible.sync="createDialogVisible">
      <!-- Form for creating a new image -->
      <el-form :model="newImage" label-width="120px">
        <el-form-item label="Repository">
          <el-input v-model="newImage.repository"></el-input>
        </el-form-item>
        <el-form-item label="Tag">
          <el-input v-model="newImage.tag"></el-input>
        </el-form-item>
        <el-form-item label="Size">
          <el-input v-model="newImage.size"></el-input>
        </el-form-item>
        <el-form-item label="Created">
          <el-input v-model="newImage.created"></el-input>
        </el-form-item>
      </el-form>

      <!-- Dialog buttons -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="createImage">Create</el-button>
        <el-button @click="createDialogVisible = false">Cancel</el-button>
      </div>
    </el-dialog>

    <!-- Edit Image Dialog -->
    <el-dialog title="Edit Docker Image" :visible.sync="editDialogVisible">
      <!-- Form for editing an image -->
      <el-form :model="editImage" label-width="120px">
        <el-form-item label="Repository">
          <el-input v-model="editImage.repository"></el-input>
        </el-form-item>
        <el-form-item label="Tag">
          <el-input v-model="editImage.tag"></el-input>
        </el-form-item>
        <el-form-item label="Size">
          <el-input v-model="editImage.size"></el-input>
        </el-form-item>
        <el-form-item label="Created">
          <el-input v-model="editImage.created"></el-input>
        </el-form-item>
      </el-form>

      <!-- Dialog buttons -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateImage">Save</el-button>
        <el-button @click="editDialogVisible = false">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    imageList: Array
  },
  data() {
    return {
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
