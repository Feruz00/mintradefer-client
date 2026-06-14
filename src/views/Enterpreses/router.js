const enterprisesRouter = [
  {
    name: 'enterprises',
    path: '/enterprises',
    component: () => import('./Page.vue'),
  },
  {
    name: 'enterprises-item',
    path: '/enterprises/:id',
    component: () => import('./PageDetail.vue'),
  },
]

export default enterprisesRouter
