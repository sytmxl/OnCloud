<template>
  
  <el-card>
    <!-- <h1>Images</h1> -->
    <el-table size="large" :data="imageList" :stripe="true">
      <el-table-column label="镜像ID" prop="id"></el-table-column>
      <!-- <el-table-column label="仓库" prop="attrs.Config.Image"></el-table-column> -->
      <el-table-column label="标签" prop="attrs.RepoTags"></el-table-column>
      <el-table-column label="大小" prop="attrs.Size"></el-table-column>
      <el-table-column label="创建时间" prop="attrs.Created"></el-table-column>
      <el-table-column label="" align="right">
        <template #default="scope">
          <div class="flex gap-2 justify-end">
            <el-button type="primary" size="small" @click="showImageDetails(scope.row)">详情</el-button>
            <el-button v-if="type == 'private'" type="danger" size="small" @click="deleteImage(scope.row)">删除</el-button>
            <el-button v-if="type == 'private'" type="primary" size="small" @click="showEditDialog(scope.row)">修改</el-button>
            <el-button v-if="type == 'public'" type="primary" size="small" @click="pull(scope.row)">拉取</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="详细信息"
      v-model="detailsDialogVisible"
      class="w-full md:w-1/2 p-4"
    >
      <image-details :detailData="selectedImage" :dialog-visible="detailsDialogVisible"  @close="detailsDialogVisible = false"></image-details>
    </el-dialog>

    <!-- Edit Image Dialog -->
    <!-- <el-dialog title="修改镜像" v-model="editDialogVisible">
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

      <div slot="footer" class="dialog-footer flex w-full  flex-row-reverse gap-1">
        <el-button type="primary" @click="updateImage">保存</el-button>
        <el-button @click="editDialogVisible = false">取消</el-button>
      </div>
    </el-dialog> -->
  </el-card>
</template>

<script>
import axios from 'axios';
import ImageDetails from '@/components/ImageDetails.vue'; 
export default {
  props: {
    type: String,
    imageList: Array
  },
  components: {
    ImageDetails,
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
      detailsDialogVisible: false,
      selectedImage: null,
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
      this.imageList.push({ ...this.newImage, id: this.imageList.length + 1 });
      this.createDialogVisible = false;
    },
    updateImage() {
      const index = this.imageList.findIndex((image) => image.id === this.editImage.id);
      if (index !== -1) {
        this.imageList[index] = { ...this.editImage };
        this.editDialogVisible = false;
      }
    },
    deleteImage(image) { 
      axios.post('/image/remove', { image_id: image.id })
        .then(response => {
          if (response.msg == "delete success") {
            this.$message.success('删除成功');

            const index = this.imageList.findIndex((img) => img.id === image.id);
            if (index !== -1) {
              this.imageList.splice(index, 1);
            }
          }
          else 
            this.$message.error('失败', response.msg);
        })
        .catch(error => {
          this.$message.error('失败', error);
        });
    },
    showImageDetails(image) {
      this.selectedImage = image;
      this.detailsDialogVisible = true;
    },
    pull(image) {
      axios.post('/image/pull', { repository: image.attrs.RepoTags[0] })
        .then(response => {
          if (response.msg == "pull success") {
            this.$message.success('拉取成功');
          }
          else 
            this.$message.error('失败', response.msg);
        })
        .catch(error => {
          this.$message.error('失败', error);
        });
    }
  },
};
</script>
