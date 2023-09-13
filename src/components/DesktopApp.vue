<template>
  <!-- two stack drawer -->
  <div class="drawer lg:drawer-open">
    <input id="meta" type="checkbox" class="drawer-toggle" />
    <!-- :class="{'surface-variant': desktop(), 'surface': !desktop()}" -->
    <div class="drawer-content flex flex-col relative h-screen" >      
      <div class="drawer drawer-end">
        <input id="notification" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col w-full relative h-screen" >      
          <navbar :showMenuIcon="showMenuIcon" class="transition fixed right-0" :class="{ 'hide': !showHeader }"/>
          <!-- Page content here -->
          <div class="main surface relative overflow-scroll w-screen pt-20  lg:w-full h-full lg:rounded-tl-2xl transition" :class="{ 'pt-0': !showHeader }" id="main" ref="scrollContainer">
            <RouterView />
          </div>
        </div>
        <div class="drawer-side" style="z-index: 101;">
          <label for="notification" class="drawer-overlay"></label> 
          <notification></notification>
        </div>
      </div>
    </div> 
    <div class="drawer-side " style="z-index: 100;">
      <label for="meta" class="drawer-overlay "></label> 
      <div class="h-full w-52 overflow-scroll surface-variant rounded-r-3xl flex flex-col shadow-lg mr-4 ">
        <side-bar></side-bar>
      </div> 
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue';
import Logo from '@/components/Logo.vue';
import Navbar from '@/components/Navbar.vue'
import Notification from '@/components/Notification.vue'

export default {
  components: {
    SideBar,
    Logo,
    Navbar,
    Notification,
  },
  data() {
    return {
      showHeader: true
    }
  },
  mounted() {
    const container = document.getElementById('main');
    container.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    const container = document.getElementById('main');
    container.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    desktop() {
      return window.innerWidth > 1024
    },
    onScroll() {
      const container = document.getElementById('main');

      const st = container.scrollTop || document.documentElement.scrollTop;
      if (st > this.lastScrollPosition && this.showHeader) {
        this.showHeader = false;
      } else if (st <= this.lastScrollPosition && !this.showHeader) {
        this.showHeader = true;
      }
      this.lastScrollPosition = st;

      // // const container = this.$refs.scrollContainer;
      // const containerHeight = container.offsetHeight;
      // const contentHeight = container.scrollHeight;
      // const scrollOffset = container.scrollTop;

      // if (this.username && scrollOffset + containerHeight >= contentHeight - 200 && !this.isLoading) {
      //   // 滚动到底部上的阈值，加载更多数据
      //   this.getMoments();
      // }
    },
  },
  computed: {
    showMenuIcon() {
      return this.$route.meta.showMenuIcon || false;
    },
    pageTitle() {
      return this.$route.meta.showPageTitle || '';
    },
  },
}
</script>

<style lang="scss">
.hide {
  transform: translateY(-5rem);

}
#app {
  background: var(--md-sys-color-surface);
}
</style>
