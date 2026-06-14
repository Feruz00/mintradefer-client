const eventsRouter = [
  {
    name: 'events',
    path: '/events',
    component: () => import('./Page.vue'),
  },
  {
    name: 'events-item',
    path: '/events/:id',
    component: () => import('./PageDetail.vue'),
  },
]

export default eventsRouter
