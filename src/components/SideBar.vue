<template>
  <div class="h-full flex flex-col justify-between">
    <ul class="flex flex-col pr-4 pt-4 pl-4 lg:pl-1 overflow-scroll ">
      <label for="meta" v-for="link in menuItems" :key="link.index"  
        class="item rounded-full items-center w-full m-0 p-4 flex flex-row" 
        :class="active2(link.index)" @click="navigate(link.index)">
          <span class="icon rounded-full p-0 mb-0 pr-2" :class="active(link.index)">{{ link.icon }}</span>
          <span class="w-full text-base text-left">{{ link.text }}</span>
      </label>
    </ul>
    <div class="flex items-left lg:flex-col p-4">
      <div class="flex items-center">
        <!-- <mosy class="w-8"></mosy> -->
        <logo class=""></logo>
        <div class="primary-text font-bold text-xl ml-2">OnCloud</div>
        
      </div>
      <!-- <div class="" style="font-size: 10px;">by mosymxl & selmiss</div> -->
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue';
// import Mosy from '@/components/Mosy.vue';
export default {
  components: {
    Logo,
    // Mosy
  },
  name: "SideBar",
  props: {
    menuItems: {
      type: Array,
      default: () => [
        { index: '/home', icon: 'home', text: '首页' },
        // { index: '/gallery', icon: 'book', text: '日常' },
        { index: '/image', icon: 'cloud', text: '镜像' },
        { index: '/load', icon: 'dns', text: '负载' },
        { index: '/team', icon: 'groups', text: '团队' },
        // { index: '/gossip', icon: 'numbers', text: 'Commits' },
        // { index: '/stuff', icon: 'view_week', text: 'Todo' },
        // { index: '/user', icon: 'face', text: '你' },
        // { index: '/login', icon: 'login', text: '登录' },
        // { index: '/register', icon: 'person_add', text: '注册' }
      ],
    },
  },
  data() {
    return {
      isMobile: false,
    };
  },
  methods: {
    active(str) {
      // icon filled when is active
      return this.$route.path.startsWith(str) ? 'material-icons' : 'material-icons-outlined'
    },
    active2(str) {
      // console.log(str, this.$route.path)
      // console.log(window.innerWidth)
      return this.$route.path.startsWith(str) ? 'active' : ''
    },
    navigate(path) {
      // 使用路由进行页面跳转
      this.$router.push(path);
    }
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
  font-size: 14px;
  border-radius: 4px;
}

.item {
  transition: 0.4s;
  // height: 50px;
  color: var(--md-sys-color-on-surface-variant);
}
.item.is-active {
  color: var(--md-sys-color-on-primary);
}
.item:hover:not(.active) {
  font-weight: bold;
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}
.item:hover .material-icons-outlined {
  font-weight: 600;
}
.active, .active:hover {
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  font-weight: bold;
}
</style>
