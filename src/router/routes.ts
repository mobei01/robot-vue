import { RouteRecordRaw } from 'vue-router';
import articleRouter from './modules/articleList';

const routes: RouteRecordRaw[] = [
  // {
  //   name: 'Login',
  //   path: '/login',
  //   component: () => import('@/views/login/Login.vue')
  // },
  // {
  //   name: 'Register',
  //   path: '/register',
  //   component: () => import('@/views/register/Register.vue')
  // },
  ...articleRouter
];

export default routes;
