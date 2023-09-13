<template>
  <TransitionGroup name="fade">

    <div v-for="(notice, innerIndex) in input" :key="innerIndex" class="relative">
      <!-- comments -->
      <div v-if="notice.type == 'comment'">
        <div class="flex" :class="{'float-right': notice.user == username}">
          <el-button v-if="selected(notice.id) && notice.user == username" class="mt-1" @click="deleteComment(moment, notice.id)">
            <span class="material-icons-outlined">delete</span>
          </el-button>
          <p class="comment text-left flex-col w-fit cursor-pointer rounded-2xl bg-white py-2 px-3 flex items-center transition relative z-10" :class="userView(notice.user), {'mb-14': selected(notice.id)}"
            >
            <!-- content -->
            <p class="w-full" @click.stop="this.$emit('click-comment', notice)">
              <strong v-if="notice.user != 'mosymxl'" class="rounded-full primary-text">{{ notice.user }}: &nbsp;</strong>
              {{ notice.content }}
            </p>
          </p>
          
        </div>
        <!-- functions shown when active -->
        <transition name="drop" mode="out-in">
          <div @click.stop="" v-if="selected(notice.id)" class="flex items-center mt-1 w-full absolute bottom-0 mb-1">
            <el-input class="surface rounded-xl border-none" id="comment" v-model="notice.comment_input" @keydown="(event) => {if (event.keyCode === 13) this.$emit('comment', moment, notice.id)}"></el-input>
            <el-button class="ml-4" @click="this.$emit('comment', moment, notice.id)">
              <!-- <span class="material-icons-outlined">reply</span> -->
              回复
            </el-button>
          </div>
        </transition>
      </div>
      <div v-else-if="notice.type == 'like'">
        {{ notice.user }} like
      </div>
      <div v-else-if="notice.type == 'user'">
        {{ notice.username }} 加入了！
      </div>
      <div v-else> 未知类型消息 </div>
    </div>
  </TransitionGroup>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'

export default {
  emits: ['clickComment', 'comment'],
  props: {
    input: Array, // Pass your array here instead of comment_ids
    moment: Object,
    selectedComment: Object,
  },
  data() {
    return {
      username: localStorage.getItem('username'),
    }
  },
  methods: {
    selected(id) {
      return this.selectedComment && id === this.selectedComment.id
    },
    async deleteComment(moment, commentId) {
      var commentList = moment.comments
      const index = commentList.findIndex(comment => comment.id === commentId);
      if (index !== -1) commentList.splice(index, 1);
      else {
        ElMessage.error('找不到该评论');
        return
      }
      axios.delete(`/comments/${commentId}/`)
        .then((response) => {
          if (response.status === 204) {
            ElMessage.success('删除评论成功');
          } else ElMessage.error('删除评论失败');
        })
        .catch((error) => {
          ElMessage.error('删除评论失败');
        });
    },
    userView(input) {
      if (input == this.username)
        return 'rounded-tr-none primary ml-4'
      else
        return 'rounded-tl-none surface-variant mr-4'
    },
  },
};
</script>
