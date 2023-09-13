<template>
  <div v-if="!isLoading">
    <TransitionGroup name="fade">
      <div v-for="groupedCommits in groupedCommitsList" :key="groupedCommits.date">
        <div class="primary-text font-bold  m-4 flex justify-between items-end">
          <div class="text-2xl">{{ groupedCommits.date }}</div>
          <div>{{ groupedCommits.commits.length }} commits</div>
        </div>
        <div class="flex flex-col rounded-3xl overflow-hidden h-fit gap-1">
          <div class="surface-variant rounded" v-for="commit in groupedCommits.commits" :key="commit.sha">
            <div class="p-4 ">
              <div class="">{{ commit.message }}</div>
            </div>
            <!-- <div class="text-right">{{ commit.author }}&nbsp;{{ commit.time }}</div> -->
          </div>
        </div>
      </div>
    </TransitionGroup>
    <div class="primary-text font-bold my-4 text-center">显示最近30条</div>
  </div>
  <Loading v-else style="height: 80vh;" />
</template>

<script>
import Loading from '../components/Loading.vue';
export default {
  components: {
    Loading,
  },
  props: {
    groupedCommitsList: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
