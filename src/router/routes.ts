import { RouteRecordRaw } from 'vue-router';
import userRouter from './modules/user';
import epsRouter from './modules/eps';

const routes: RouteRecordRaw[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/views/register/Register.vue')
  },
  ...userRouter,
  ...epsRouter
];

export default routes;
