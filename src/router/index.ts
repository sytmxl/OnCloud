import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { showMenuIcon: false, showPageTitle: 'Space' },
    },
    {
      path: '/image',
      name: 'image',
      component: () => import('../views/Image.vue'),
      meta: { showMenuIcon: false, showPageTitle: 'Space' },
    },
    {
      path: '/load',
      name: 'load',
      component: () => import('../views/Load.vue'),
      meta: { showMenuIcon: false, showPageTitle: 'Space' },
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/Team.vue'),
      meta: { showMenuIcon: false, showPageTitle: 'Space' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { showMenuIcon: false, showPageTitle: '关于' },
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/Blog.vue'),
      meta: { showMenuIcon: false, showPageTitle: '查询' },
    },
    {
      path: '/Gallery',
      name: 'Gallery',
      component: () => import('../views/Gallery.vue'),
      meta: { showMenuIcon: true, showPageTitle: '日常' },
    },
    {
      path: '/Stuff',
      name: 'Stuff',
      component: () => import('../views/Stuff.vue'),
      meta: { showMenuIcon: false, showPageTitle: 'Todos' },
    },
    {
      path: '/Gossip',
      name: 'Gossip',
      component: () => import('../views/Gossip.vue'),
      meta: { showMenuIcon: false, showPageTitle: 'Commits' },
    },
    // {
    //   path: '/Login',
    //   name: 'Login',
    //   component: () => import('../views/Login.vue')
    // },
    // {
    //   path: '/Register',
    //   name: 'Register',
    //   component: () => import('../views/Register.vue')
    // },
    {
      path: '/User',
      name: 'User',
      component: () => import('../views/User.vue'),
      meta: { showMenuIcon: false, showPageTitle: '你' },
    },
    {
      path: '/MagicEntrance',
      name: 'reg',
      component: () => import('../components/Register.vue'),
      meta: { showMenuIcon: false, showPageTitle: '你' },
    },
  ]
})
router.beforeEach((to, from, next) => {
  // 设置标签页名称
  document.title = 'Space';

  // let id = sessionStorage.getItem("identity");
  // console.log(id)
      // 没登录跳转到登录
  // if (!id && to.path != '/welcome') next('/welcome')
  // if (id == 3 && (to.name == 'MaintenanceKnowledgeBase' || to.name == 'MaintenanceKnowledgeBase2')) next('/user/info')
  if (to.path == '/') next('/home')
  next();
});
export default router
