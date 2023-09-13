<!-- UserList.vue -->

<template>
  
  <div v-if="username == 'mosymxl'" class="p-4 max-w-2xl mx-auto">
    <ImageLayout></ImageLayout>

    <h2 class="primary-text">User List</h2>
    <ul>
      <li v-for="user in userList" :key="user.id">
        {{ user.username }} - {{ user.date_joined }}
      </li>
    </ul>
  </div>
  <div v-else class=" text-center h-full mt-32 text-3xl font-bold">还没有公开内容捏</div>

</template>

<script>
import axios from 'axios';
import ImageLayout from '@/components/ImageLayout.vue';
export default {
  data() {
    return {
      userList: [],
      username: localStorage.getItem('username'),
    };
  },
  mounted() {
    this.fetchUserList();
  },

  components: {
    ImageLayout
  },
  methods: {
    fetchUserList() {
      axios.get('/user_list/')
        .then((response) => {
          this.userList = response.data;
        })
        .catch((error) => {
          console.error('Error fetching user list:', error);
        });
    },
  },
};
</script>
