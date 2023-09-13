<template>
  <div class=" transition backdrop-blur bg-black bg-opacity-20 fixed left-0 top-0 w-full h-full flex items-center" style="z-index: 300;">
    <div class="fixed bottom-8 right-1/2" style="z-index: 301; transform: translateX(24px);">
      <label @click="closeBig()" class="btn btn-square primary btn-ghost float-right">
        <span class="material-icons-outlined">close</span>
      </label>
    </div>
    <swiper
      :style="swiperStyle"
      :zoom="true" :navigation="true" :pagination="{ clickable: true }" :modules="modules" :initialSlide="initialSlide"
      class="mySwiper h-full w-full"
    >
      <swiper-slide class=" " v-for="imageUrls in bigImages" :key="imageUrls[0]">
        <div class="swiper-zoom-container h-full">
          <img :data-src="imageUrls[0]" src="../assets/loading.svg" alt="Image" class="lazy rounded-none" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Zoom, Navigation, Pagination } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    bigImages: Array,
    initialSlide: Number,
  },
  data() {
    return {
      swiperStyle: {
        '--swiper-navigation-color': '#00000000',
        '--swiper-pagination-color': 'var(--md-sys-color-primary)',
      },
      modules: [Zoom, Navigation, Pagination],
    };
  },
  methods: {
    closeBig() {
      this.$emit('close')
    },
  },
};
</script>
