<template>
  <div class="lg:pl-56 lg:w-full p-2 mx-auto" style="z-index: 99; ">
    <div class="navbar surface-variant rounded-full shadow-lg" >
      <div class="navbar-start invisible md:visible lg:invisible">
        <label for="meta" class="btn btn-square btn-ghost">
          <span class="material-icons-outlined">menu</span>
        </label>
      </div>
      <div class="navbar-center flex transition">
        <logo id="navbar-logo"></logo>
        <!-- <div id="logo-name" class=" font-bold text-2xl ml-2 hidden transition">Space</div> -->
      </div>
      <div class="navbar-end flex invisible lg:visible" @click="updateCheckTime">
        <span v-if="unread_num > 0" class=" rounded-full primary px-2">{{ unread_num }}</span> 
        <label for="notification" class="btn btn-square btn-ghost">
          <span class="material-icons-outlined">person</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue';
import axios from 'axios';
export default {
  components: {
    Logo,
  },
  props: {
    showMenuIcon: Boolean, // Pass the showMenuIcon prop to control visibility
    // pageTitle: String, // You can pass other props if needed
  },
  data() {
    return {
      unread_num: 0
    }
  },
  mounted() {
    // this.get_unread_num()
  },
  methods: {
    get_unread_num() {
      axios.get('/get_unread_notice_numbers/')
        .then(response => {
          this.unread_num = response.data.unread_comment_count;
        })
        .catch(error => {
          console.error('Error fetching unread comment count:', error);
        });
    },
    updateCheckTime() {
      this.unread_num = 0
      axios.post('/update_check_time/')
        .then(response => {
        })
        .catch(error => {
          console.error('Error updating check time:', error);
        });
    },
  }
};
</script>

<style scoped>
@keyframes enterScaleAnimation {
  from {
    transform: scale(100);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

#navbar-logo {
  animation: enterScaleAnimation 0.3s  cubic-bezier(0.075, 0.82, 0.165, 1) forwards; /* Adjust duration and easing as needed */
}
.navbar-center:hover {
  #logo-name {
    display: block;
    transform: translateX(20px);
  }
  #navbar-logo {
    transform: translateX(-20px);
  }
}
</style>
