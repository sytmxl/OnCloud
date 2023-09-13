<template>
  <div class="max-w-6xl mx-auto">
    <!-- <div class="tabs tabs-boxed w-fit mx-auto mt-4">
      <a class="tab" v-for="(tab, index) in tabs" :class="{'tab-active': index == activeTab }" @click="activeTab = index; this.swiper.slideNext()">{{ tab }}</a> 
    </div> -->
    <swiper
      class=" p-4 " ref="swiper"
      :activeIndex="activeTab"
      :slides-per-view="slidesPerView"
      spaceBetween="20"
      :modules="modules"
      @slideChange="onSlideChange()"
    >
      <swiper-slide class="rounded-3xl mb-16">
        <h1 class="title">前端</h1>
        <CommitList class="" :groupedCommitsList="groupedFrontendCommits" :isLoading="isLoading" />
      </swiper-slide>
      <swiper-slide class="mb-16">
        <h1 class="title">后端</h1>
        <CommitList :groupedCommitsList="groupedBackendCommits" :isLoading="isLoading" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import axios from 'axios';
import Loading from '../components/Loading.vue';
import CommitList from '../components/CommitList.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { useSwiper } from 'swiper/vue';
export default {
  components: {
    Loading,
    CommitList,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      commits: [],
      error: '',
      isLoading: true,
      frontendCommits: [],
      backendCommits: [],
      groupedFrontendCommits: [],
      groupedBackendCommits: [],
      tabs: ['前端', '后端'],
      activeTab: 0,
      swiper: null,
      modules: [Navigation, Pagination, A11y],
    };
  },
  mounted() {
    const frontendPromise = this.fetchCommits('space');
    const backendPromise = this.fetchCommits('space-backend');

    this.swiper = useSwiper()

    Promise.all([frontendPromise, backendPromise])
      .then(([frontendData, backendData]) => {
        this.frontendCommits = frontendData;
        this.backendCommits = backendData;
        this.groupedFrontendCommits = this.groupCommitsByDay(frontendData);
        this.groupedBackendCommits = this.groupCommitsByDay(backendData);
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = 'Error fetching commits';
        this.isLoading = false;
      });
  },
  computed: {
    slidesPerView() {
      return window.innerWidth >= 720 ? 2 : 1;
    }
  },
  methods: {
    async fetchCommits(repo) {
      const owner = 'sytmxl';
      return axios.get(`/github/commits/${owner}/${repo}/`)
        .then(response => {
          return response.data.map(commit => ({
            ...commit,
            time: this.getTimeFromDateTime(commit.date),
          }));
        })
        .catch(err => {
          this.error = 'Error fetching GitHub commits';
          throw err; // Rethrow the error to be caught in the Promise.all() block
        });
    },
    groupCommitsByDay(commits) {
      const groupedCommits = [];
      commits.forEach(commit => {
        const commitDate = new Date(commit.date).toLocaleDateString('en', {
          day: 'numeric',
          month: 'short',
        });
        const existingGroup = groupedCommits.find(group => group.date === commitDate);
        if (existingGroup) {
          existingGroup.commits.push(commit);
        } else {
          groupedCommits.push({
            date: commitDate,
            commits: [commit],
          });
        }
      });
      return groupedCommits;
    },
    getTimeFromDateTime(dateTime) {
      return new Date(dateTime).toLocaleTimeString('en', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    },
    onSlideChange(activeIndex) {
      this.activeTab = activeIndex;
      // console.log(activeIndex, this.swiper)
      
    }
  },
};
</script>

<style lang="scss">
.title {
  @apply m-4 mx-auto w-fit text-4xl 
}
</style>
