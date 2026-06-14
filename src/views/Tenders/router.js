const tenderRoutes = [
  {
    name: 'tender',
    path: '/tender',
    component: () => import('./Page.vue'),
  },
  {
    name: 'tender-item',
    path: '/tender/:id',
    component: () => import('./PageDetail.vue'),
  },
]

export default tenderRoutes
