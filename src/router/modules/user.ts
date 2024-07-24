import layout from '@/components/layout/index.vue';

const userRouter = [
  {
    name: 'layout',
    path: '/',
    component: layout,
    meta: {
      keepAlive: true
    },
    // redirect: {
    //   path: '/user'
    // },
    children: [
      {
        name: 'User',
        path: '/user',
        component: () => import('@/views/user/user.vue')
      }
    ]
  }
];

export default userRouter;
