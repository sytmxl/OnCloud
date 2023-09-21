<template>
  
  <el-card>
    <!-- <h1>Images</h1> -->
    <el-table size="large" :data="imageList" :stripe="true">
      <el-table-column label="短镜像ID" prop="short_id" min-width="150px">
        <template #default="scope">
          {{ scope.row.short_id.slice(7) }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="仓库" prop="attrs.Config.Image"></el-table-column> -->
      <el-table-column label="标签" prop="attrs.RepoTags" min-width="300px"></el-table-column>
      <el-table-column label="大小" prop="attrs.VirtualSize" min-width="150px">
        <template #default="scope">
          {{ formatBytes(scope.row.attrs.VirtualSize) }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="attrs.Created" min-width="200px">
        <template #default="scope">
          {{ getRelativeDateTime(scope.row.attrs.Created) }}
        </template>
      </el-table-column>
      <el-table-column label="" align="right" min-width="200px">
        <template #default="scope">
          <div v-if="scope.row.pulling" class="flex gap-2 justify-end items-center">
            <el-input v-model="newTag" v-loading="loading" ></el-input>
            <el-button size="small" @click="pull(scope.row)">确认</el-button>
          </div>
          <div v-else class="flex gap-2 justify-end">
            <el-button type="primary" size="small" @click="showImageDetails(scope.row)"><span class="material-icons-outlined">info</span></el-button>
            <el-button v-if="type == 'private'"  size="small" @click="showEditDialog(scope.row)"><span class="material-icons-outlined">edit</span></el-button>
            <el-button v-if="type == 'private'" type="danger" size="small" @click="deleteImage(scope.row)"><span class="material-icons-outlined">delete</span></el-button>
            <el-button v-if="type == 'public'"  size="small" @click="scope.row.pulling = true">拉取</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="详细信息"
      v-model="detailsDialogVisible"
      class=""
    >
      <image-details :detailData="selectedImage" :dialog-visible="detailsDialogVisible"  @close="detailsDialogVisible = false"></image-details>
    </el-dialog>

    <!-- Edit Image Dialog -->
    <el-dialog title="修改镜像" v-model="editDialogVisible">
      <CreateImage type="edit" :image-id="selectedImage.id"></CreateImage>
    </el-dialog>
  </el-card>
</template>

<script>
import axios from 'axios';
import ImageDetails from '@/components/ImageDetails.vue'; 
import CreateImage from './CreateImage.vue';
import { getRelativeDateTime, formatBytes } from '@/utils';
export default {
  props: {
    type: String,
    imageList: Array
  },
  components: {
    ImageDetails,
    CreateImage
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
      pulling: false,
      newTag: 'pulltest:0.0.1'
    };
  },
  computed: {
    cutId() {
      return this.imageList.map(item => item.short_id.replace("sha256:", ""));
    },
  },
  methods: {
    getRelativeDateTime(input) {
      return getRelativeDateTime(input)
    },
    formatBytes(input) {
      return formatBytes(input)
    },
    showCreateDialog() {
      this.createDialogVisible = true;
    },
    showEditDialog(image) {
      this.selectedImage = image;
      this.editDialogVisible = true;
    },
    createImage() {
      this.imageList.push({ ...this.newImage, id: this.imageList.length + 1 });
      this.createDialogVisible = false;
    },
    deleteImage(image) { 
      axios.post('/image/remove', { image_id: image.id })
        .then(response => {
          const msg = response.data.msg
          
          if (msg == "delete success") {
            this.$message.success('删除成功');

            const index = this.imageList.findIndex((img) => img.id === image.id);
            if (index !== -1) this.imageList.splice(index, 1);
          }
          else  
            this.$message.error('失败: ' + msg);
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
      axios.post('/image/pullrepo', { old_tag: image.attrs.RepoTags[0], new_tag: this.newTag})
        .then(response => {
          if (response.data) {
            this.$message.success('拉取成功');
          }
          else 
            this.$message.error('失败：' + response.msg);
          image.pulling = false
        })
        .catch(error => {
          this.$message.error('失败', error);
        });
    }
  },
};
</script>
