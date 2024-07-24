const empRouter = [
  {
    name: 'eps',
    path: '/eps',
    component: () => import('@/views/eps/index.vue'),
    meta: { title: '视频通讯' }
  }
];

export default empRouter;
