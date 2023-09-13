<template>
  <div class="p-4 max-w-2xl mx-auto relative flex flex-col h-full w-full touch-pan-y overflow-y-scroll" id="moments-container" @click="selectedMoment = selectedComment = null">
    <div v-if="username == 'mosymxl'" class=" transition w-full surface mb-4" :class="{ 'stickyani': !showHeader }" >
      <!-- create moment -->
      <div class="flex items-center mb-4 gap-2">
        <el-input ref="dailyInput" id="content" v-model="newMomentContent" @keydown="handleKeydown"></el-input>
        <!-- <el-button @click="this.debug = !this.debug">debug</el-button> -->
      </div>
      <div class=" w-full">
        <input type="file" ref="fileInput" @change="uploadImage" multiple/>
        <el-button class=" grow" type="primary" @click="createMoment()" :loading="uploadLoading">分享</el-button>
        <!-- <el-button class="" type="" @click="createMoment(false)">记录</el-button> -->
      </div>
      <!-- <div class="preview-container">
        <slick-list :list="imageURLList" @end="handleSortEnd">
          <slick-item v-for="(image, index) in imageURLList" :key="index">
            <div class="image-item w-fit h-fit">
              <img :src="image" class="preview-image" />
            </div>
          </slick-item>
        </slick-list>
      </div> -->
    </div>
    <!-- <div v-if="username == 'mosymxl'" class="header-placeholder" style="height: 118px"></div> -->
    
    <!-- moments list -->
  
    <TransitionGroup name="fade">
      <div class="item rounded-xl mb-5" v-for="moment in moments" :key="moment.id" :data-index="moment.id">
        <div class="surface-variant rounded-3xl" :class="roundedCorner">
  
          <!-- content -->
  
          <div @click.stop="selectedMoment = selectedMoment == moment? null : moment" class="rounded-3xl text-base select-moment relative z-10" :class="visibleStyle(moment.visible)">
            <p class="p-4 cursor-pointer">{{ moment.content }}</p>
            <ImageLayout class="p-1 pt-0 cursor-pointer" v-if="moment.medias" :image-list="moment.medias" @show-big="(list, no) => {this.$emit('show-big', list, no)}"></ImageLayout>
          </div>
  
          <!-- functions  -->
          <div class="px-4 py-2 surface-variant rounded-t-none rounded-3xl transition relative " :class=" {'pt-16': selectedMoment && selectedMoment.id == moment.id}">
            <!-- debug info  -->
            <p v-if="debug">{{ moment }}</p>
            <img v-if="moment.image" :src="moment.image" alt="Moment image">
            <video v-if="moment.video" :src="moment.video" controls></video>
  
            <!-- create comment -->
            <transition name="drop" appear>
              <div @click.stop="" v-if="selectedMoment && selectedMoment.id == moment.id" class="flex items-center mb-2 absolute top-3 left-0 px-4 w-full" :key="moment.id">
                <el-input id="comment" v-model="moment.comment_input" @keyup.enter="createComment(moment)"></el-input>
                <el-button  class="ml-4" @click="createComment(moment)">
                  <!-- <span class="material-icons-outlined">question_answer</span> -->
                  发送
                </el-button>
              </div>
            </transition>
  
            <!-- likes list -->
            <TransitionGroup v-if="username == 'mosymxl'" name="fade">
              <div v-if="moment.likes.length" class="flex items-center align-middle">
                <span  class="material-icons inline mr-2">favorite </span>
                <span><strong>{{ moment.likes.length }}</strong></span>
              </div>
              <div class="inline" v-for="(like, index) in moment.likes" :key="index">
                <span><strong class="rounded-full primary-text">{{ like }}</strong></span>
                <span v-if="index != moment.likes.length - 1"><strong>,&nbsp;</strong></span>
              </div>
            </TransitionGroup>
          
            <!-- buttons -->
            <div class="flex justify-between items-center gap-1">
              <div class="" style="color: var(--md-sys-color-secondary);"> {{ getRelativeDateTime(moment.created_at) }}</div>
              <div v-if="username == 'mosymxl'" class="flex gap-1">
                <el-button @click="toggleVisibility(moment)"><span class="material-icons-outlined">{{ moment.visible ? 'lock' : 'lock_open' }}</span></el-button>
                <el-popconfirm 
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  title="确认删除?"
                  width="200"
                  :hide-icon="true"
                  :button-size="'large'"
                  @confirm="deleteMoment(moment.id)"
                  @cancel=""
                >
                  <template #reference>
                    <el-button ><span class="material-icons-outlined">delete</span></el-button>
                  </template>
                </el-popconfirm> 
              </div>
              <div v-else class="flex gap-2">
                <el-button  @click.stop="selectedMoment = selectedMoment == moment? null : moment" >
                  <span class="material-icons-outlined">question_answer</span>
                </el-button>
                <el-button :type="liked(moment.likes) == 'favorite' ? 'primary' : ''"  @click="like(moment.id)" >
                  <span class="material-icons">{{ liked(moment.likes) }}</span>
                </el-button>
              </div>           
            </div>
          </div>
        </div>
        
        <!-- comments list -->
        <TransitionGroup name="fade">
          <div class="flex flex-col mt-2 rounded-3xl rounded-tl-none gap-2" v-for="(comment_ids, index) in moment.comments_group" :key="index">
            <Comments :input="ids2comments(comment_ids, moment)" @click-comment="showReplyInput" @comment="createComment" :moment="moment" :selectedComment="selectedComment" />
          </div>
        </TransitionGroup>
      </div>
    </TransitionGroup>
  
    <loading v-if="hasNextPage" class="pb-20 lg:pb-0" :class="{'first-display': !moments.length}"></loading>
    <div v-else class="text-center">{{ limit() }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import Loading from '@/components/Loading.vue';
import { SlickList, SlickItem } from 'vue-slicksort';
import { ElMessage } from 'element-plus'
import Comments from '@/components/Comments.vue';
import ImageLayout from '@/components/ImageLayout.vue';

export default {
  name: 'Moments',
  emits: ['show-big'],
  components: {
    Loading,
    SlickList,
    SlickItem,
    Comments,
    ImageLayout,
  },
  data() {
    return {
      moments: [],
      newMomentContent: '',
      newCommentText: '',
      debug: false,
      imageURLList: [], // image urls: path and signatures got from OSS for display
      imageList: [], // image paths: relative paths for db storing
      showHeader: true,
      username: localStorage.getItem('username'),
      showConfirmPopup: false,
      showReply: false,
      selectedComment: null,
      selectedMoment: null,
      uploadLoading: false,
      isLoading: false,
      hasNextPage: true,
      nextPage: 1,
    }
  },
  mounted() {
    this.getMoments()
    window.addEventListener('keydown', this.handleKeyPress);

    const container = document.getElementById('moments-container');
    container.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    const container = document.getElementById('moments-container');
    container.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      const container = document.getElementById('moments-container');

      const containerHeight = container.offsetHeight;
      const contentHeight = container.scrollHeight;
      const scrollOffset = container.scrollTop;
      // console.log(scrollOffset + containerHeight, contentHeight)
      if (this.username && scrollOffset + containerHeight + 800 >= contentHeight && !this.isLoading) {
        // 滚动到底部上的阈值，加载更多数据
        this.getMoments();
      }
    },
    getMoments() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      axios.get((this.username === null) ? `/moments/get/mosy_unauth?page=${this.nextPage}` : `/moments/get/mosy?page=${this.nextPage}`)
        .then(response => {
          // console.log(response.data)
          const data = response.data;
          this.moments.push(...data.results);
          this.hasNextPage = data.next !== null;
          this.nextPage++;
          this.isLoading = false;
          this.updateLazyload()
        })
        .catch(error => {
          console.error(error);
        });
    },
    createMoment(visible=true) {
      if (this.newMomentContent == '' || this.newMomentContent == null) {
        ElMessage.error('请输入后点击发送');
        return
      }
      const imageList = this.imageList
      const content = this.newMomentContent
      this.newMomentContent = '';
      this.imageURLList = []; // 清空图片列表
      this.imageList = []
      axios.post('/moments/create/', { content: content, media: imageList, visible: visible })
        .then((response) => {
          this.moments.splice(0, 0, response.data);
          this.updateLazyload()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    liked(likes) {
      const keys = Object.keys(likes);
      const index = keys.findIndex(key => likes[key] === this.username);
      return index !== -1 ? 'favorite' : 'favorite_border'
    },
    like(momentId) {
      // separate frontend and backend for instant response
      if (this.username == '未登录' || this.username == null) {
        ElMessage.error('注册登录以点赞或评论');
        return
      }
      const momentIndex = this.moments.findIndex((moment) => moment.id === momentId);
      let likes = this.moments[momentIndex].likes;
      const keys = Object.keys(likes);
      const index = keys.findIndex(key => likes[key] === this.username);
      if (index !== -1)
        likes.splice(index, 1);
      else
        likes.push(this.username)
      axios.post('/moments/like/', { moment_id: momentId })
        .then((response) => {
          if (response.status !== 204 && response.status !== 201) 
            ElMessage.error("点赞失败");
        })
        .catch((error) => {
          ElMessage.error('注册登录以点赞或评论');
        });
    },
    getLikes(momentId) {
      axios.get('/likes/get/', { moment_id: momentId })
        .then((response) => {
          const momentIndex = this.moments.findIndex((moment) => moment.id === momentId);
          this.moments[momentIndex].likes = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteMoment(momentId) {
      axios.post('/moments/delete/', { moment_id: momentId })
        .then(response => {
          const momentIndex = this.moments.findIndex(moment => moment.id === momentId);
          if (momentIndex !== -1) 
            this.moments.splice(momentIndex, 1);
        })
        .catch(error => {
          // Handle error response
          console.log('Error deleting moment:', error)
        })
    },
    uploadImage(event) {
      this.uploadLoading = true
      const files = event.target.files;
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i]);
      }

      axios.post('/upload/', formData)
        .then(response => {
          // 在这里处理返回的图片 URL
          // console.log('上传成功，图片 URL：', imageUrls);
          this.imageURLList.push(...response.data.urls);
          this.imageList.push(...response.data.paths);
          this.uploadLoading = false
        })
        .catch(error => {
          console.error('上传失败：', error);
        });
    },
    createComment(moment, replyTo=null) {
      var obj = {}
      if (replyTo == null) obj = moment
      else obj = moment.comments[moment.comments.findIndex((comment) => comment.id === replyTo)]
      // console.log(obj)
      if (this.username == null) {
        ElMessage.error('注册登录以点赞或评论');
        return
      }
      if (obj.comment_input == '' || obj.comment_input == null) {
        ElMessage.error('请输入后点击发送');
        return
      }
      const input = obj.comment_input
      obj.comment_input = ''; // avoid multi send same content
      axios.post('/moments/comments/create/', { content: input, moment_id: moment.id, reply_to: replyTo })
        .then((response) => {
          // console.log(response)
          moment.comments.push(response.data.comment)
          moment.comments_group = response.data.nested_array
        })
        .catch((error) => {
          ElMessage.error(error);
        });
    },
    showReplyInput(comment) {
      this.selectedComment = this.selectedComment === comment ? null : comment;
      comment.show_input = true
    },
    handleSortEnd(sortedList) {
      // 处理拖动排序结束的逻辑
      this.imageURLList = sortedList;
    },
    sendToBackend() {
      // 发送 imageURLList 到后端的逻辑
      console.log(this.imageURLList);
    },
    open (e, list) {
      fancyBox(e.target, list);
    },
    deleteMomentConfirmation(momentId) {
      this.showConfirmPopup = true;
    },
    limit() {
      if (this.username == null) return '未登录用户可查看最近3条'
      else return '到底了捏'
    },
    ids2comments(ids, moment) {
      // console.log(ids, moment.comments.filter(comment => ids.includes(comment.id)))
      return moment.comments.filter(comment => ids.includes(comment.id));
    },
    updateLazyload() {
      this.$nextTick(() => {
        this.$lazyload.update();
      });
    },
    handleKeydown(event) {
      if (event.keyCode === 13 && event.metaKey) {
        this.createMoment();
      }
      else if (event.keyCode === 13) {
        this.createMoment(false);
      }
    },
    handleKeyPress(event) {
      if (event.metaKey && event.key === '/') {
        this.$refs.dailyInput.focus();
        event.preventDefault();
      }
    },
    roundedCorner() {
      if (this.username === 'mosymxl') return 'rounded-tr-none'
      else return 'rounded-tl-none'
    },
    visibleStyle(visible) {
      if (visible) return this.roundedCorner() + ' primary'
      else return 'surface-v-border surface'
    },
    toggleVisibility(moment) {
      moment.visible = !moment.visible;
      axios.post(`/moments/${moment.id}/`)
        .then((response) => {
          if (response.status != 200) {
            ElMessage.error('改变可见失败');
            moment.visible = !moment.visible;
          }
        })
        .catch((error) => {
          ElMessage.error('改变可见失败');
        });
    },
    getRelativeDateTime(dateTimeStr) {
      const currentDate = new Date();
      const dateTime = new Date(dateTimeStr);

      const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      const dateTimeWithoutTime = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());

      const timeDifference = dateTimeWithoutTime - currentDateWithoutTime;
      const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      
      const hour_min = { hour: '2-digit', minute: '2-digit' };
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

      if (daysDifference === 0) {
        return `今天 ${dateTime.toLocaleTimeString('zh-CN', hour_min)}`;
      } else if (daysDifference === -1) {
        return `昨天 ${dateTime.toLocaleTimeString('zh-CN', hour_min)}`;
      } else if (daysDifference > -7) {
        return `${-daysDifference}天前 ${dateTime.toLocaleTimeString('zh-CN', hour_min)}`;
      } else {
        return dateTime.toLocaleTimeString('zh-CN', options);
      }
    },
  },
}
</script>

<style scoped>
.stickyani {
  transform: translateY(-100%);
}
.item {
  height: fit-content;
  word-wrap: break-word;
}
.first-display {
  height: 80vh;
}
</style>