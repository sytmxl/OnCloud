<template>
  <div class="flex justify-center">
    <div class="flex p-4 overflow-x-scroll w-fit gap-4" v-if="!loading">
      <TransitionGroup name="fade">
        <div class="" v-for="(group, status) in items" :key="status">
          <div class="primary-text font-bold  m-4 flex justify-between items-end">
            <div class="text-2xl">{{ status }}</div>
            <div>{{ group.length }} </div>
          </div>
          <div class="flex flex-col rounded-3xl p-2 overflow-hidden h-fit gap-2 w-64" :class="status2bg(status)">
            <div class="rounded-2xl " :class="status2color(status)" v-for="item in group" :key="item.id">
              <div class="p-3 ">
                <div class="" >{{ item.plainText }}</div>
              </div>
              <!-- <div class="text-right">{{ commit.author }}&nbsp;{{ commit.time }}</div> -->
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <loading v-else style="height: 80vh;" ></loading>
  </div>
</template>

<script>
import axios from 'axios';
import Loading from '../components/Loading.vue';
export default {
  data() {
    return {
      responseData: null,
      items: [],
      loading: true
    };
  },
  components: {
    Loading,
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('/notion_data/')
        .then(data => {
          // Process the API response and extract the "plain_text" and group them
          const statusGroups = {
            "Not started": [],
            "In progress": [],
            "Done": [],
          }
          data.data.results.forEach(item => {
            const statusName = item.properties.Status.status.name;
            if (statusName) {
              statusGroups[statusName].push({
                id: item.id,
                plainText: item.properties.Name?.title[0].plain_text
              });
            }
          });
          this.items = statusGroups;
          this.loading = false;
        })
        .catch(error => {
          // Handle any errors that occurred during the API call
          this.error = error.message || 'Unknown error';
          console.error('Error fetching data:', error);
          this.loading = false;
        });
    },
    status2bg(status) {
      if (status == "Not started") return 'secondary-container'
      if (status == "In progress") return 'secondary-container'
      if (status == "Done") return 'primary-container'
    },
    status2color(status) {
      if (status == "Not started") return 'surface'
      if (status == "In progress") return 'secondary'
      if (status == "Done") return 'primary'
    }
  },
};
</script>
