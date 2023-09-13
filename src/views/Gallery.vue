<template>
  <!-- big pic view after clicking thumbnails -->
  <ImageLightbox v-if="showbigImages" :big-images="bigImages" :initial-slide="initialSlide" @close="closeBig()"></ImageLightbox>
  
  <!-- mobile view  -->
  <swiper
    :initialSlide="1"
    class="swiper-daily flex h-screen gap-4"
    v-if="!isLgScreen()"
  >
    <swiper-slide class="h-screen p-4 relative touch-pan-y">
      <Todos class="w-full sticky left-0 top-0"></Todos>
    </swiper-slide>
    <swiper-slide class="max-h-full touch-pan-x">
      <Moments @show-big="showBig"></Moments>
    </swiper-slide>
    <!-- <swiper-slide class=" lg:flex-1 hidden lg:block">
      <div ></div>
    </swiper-slide> -->
  </swiper>

  <!-- desktop view  -->
  <div class=" flex h-full w-full p-4 gap-4 relative" v-else>
    <Todos class=" h-fit sticky left-0 top-4 w-1/3"></Todos>
    <Moments @show-big="showBig" class=" w-2/3"></Moments>
  </div>
</template>

<script>
import axios from 'axios';

import ImageLightbox from '@/components/ImageLightbox.vue';
import Todos from '@/components/Todos.vue';
import Moments from '@/components/Moments.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
  name: 'Gallary',
  components: {
    Moments,
    ImageLightbox,
    Todos,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      moments: [],
      username: localStorage.getItem('username'),
      bigImages: null,
      showbigImages: false,
      initialSlide: 0,
      uploadLoading: false,
    };
  },
  mounted() {
  },
  methods: {
    updateLazyload() {
      this.$nextTick(() => {
        this.$lazyload.update();
      });
    },
    showBig(url, index) {
      this.bigImages = url
      this.initialSlide = index
      this.showbigImages = true
      this.updateLazyload()
    },
    closeBig() {
      this.bigImages = null
      this.showbigImages = false
    },
    isLgScreen() {
      return window.innerWidth >= 720;
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
  },
  computed: {
  },
};
</script>
<style lang="scss" scoped>
</style>
