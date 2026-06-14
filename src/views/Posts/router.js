const newsRouter = [
  {
    name: 'news',
    path: '/news',
    component: () => import('./Page.vue'),
  },
  {
    name: 'news-item',
    path: '/news/:id',
    component: () => import('./PageDetail.vue'),
  },
]

export default newsRouter
