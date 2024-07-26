// import layout from '@/components/layout/index.vue';

const userRouter = [
  {
    name: 'layout',
    path: '/',
    // component: layout,
    meta: {
      keepAlive: true
    },
    // redirect: {
    //   path: '/user'
    // },
    children: [
      {
        name: 'articleList',
        path: '/articleList',
        component: () => import('@/views/articleList/index.vue')
      }
    ]
  }
];

export default userRouter;
