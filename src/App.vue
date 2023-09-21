<template>
  <div v-if="!isLgScreen()">
    <div class="relative overflow-scroll w-screen h-full transition" id="main"  ref="scrollContainer">
      <RouterView  />
    </div>
    <div class="bottom-bar z-50 transition" ref="bottomBar" @touchstart="handleTouchStart" @touchmove.prevent="handleTouchMove" @touchend="handleTouchEnd">
      <div class="visible-content">
        <navbar :showMenuIcon="showMenuIcon" class="transition w-fit"/>
      </div>
      <div class="hidden-content" @click="closeBar()" ref="hiddenContent">
        <div class="carousel-item m-2 surface-variant rounded-3xl flex flex-col shadow-lg ">
          <side-bar ></side-bar>
        </div> 
      </div>
    </div>
  </div>
  <desktop-app v-else></desktop-app>
</template>

<script>
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue';
import Logo from './components/Logo.vue';
import Navbar from '@/components/Navbar.vue'
import Notification from '@/components/Notification.vue'
import DesktopApp from '@/components/DesktopApp.vue'

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
  components: {
    SideBar,
    Logo,
    Navbar,
    Notification,
    Swiper,
    SwiperSlide,
    DesktopApp
  },
  data() {
    return {
      showHeader: true,
      touchStartY: 0,
      translateY: 0,
      maxTranslateY: 0,
      dragging: false,
    }
  },
  mounted() {
    const container = document.getElementById('main');
    // this.maxTranslateY = this.$refs.hiddenContent.clientHeight || 0;
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
    isLgScreen() {
      return window.innerWidth >= 720;
    },
    handleTouchStart(event) {
      this.touchStartY = event.touches[0].clientY;
      this.dragging = true;
      // console.log(this.dragging)
    },
    handleTouchMove(event) {
      if (this.dragging) {
        const touchY = event.touches[0].clientY;
        this.translateY = touchY - this.touchStartY
        // console.log(touchY - this.touchStartY + this.translateY, this.translateY)
        if (touchY > this.touchStartY)
          this.openBar()
        else 
          this.closeBar()
      }
    },
    closeBar() {
      this.$refs.bottomBar.style.transform = `translateY(0)`; 
    },
    openBar() {
      this.$refs.bottomBar.style.transform = `translateY(calc(100% - 5rem))`;   
    },
    handleTouchEnd() {
      this.dragging = false;
      // console.log(this.dragging)
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
#app {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}
body {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: transform 0.3s ease-in-out;
  transform: translateY(calc(100% - 5rem));
}
.el-table-column {
  // min-width: 300px !important;
}
th {
  // min-width: 300px !important;
}
.el-table__cell {
  // min-width: 300px !important;
}
</style>
