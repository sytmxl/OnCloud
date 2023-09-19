
<template>
  <div class="p-4 max-w-2xl mx-auto">
    <div class="">

      <div>首页</div>
    </div>

  </div>
</template>
<script>
import axios from 'axios';
// import Todos from '@/components/Todos.vue';
// import Markdown from '@/components/Markdown.vue';
export default {
  methods: {
    async startWeChatLogin() {
      const redirectUri = encodeURIComponent('http://yourdomain.com/wechat/callback');
      const weChatAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=YOUR_APP_ID&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=STATE_VALUE#wechat_redirect`;

      window.location.href = weChatAuthUrl;
    }
  },
  components: {
    // Todos, Markdown
  },
  async mounted() {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      try {
        const response = await axios.get(`/your-backend-endpoint?code=${code}`);
        // Handle the response from your backend
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
