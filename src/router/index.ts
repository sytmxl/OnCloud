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
