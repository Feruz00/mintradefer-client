import { createRouter, createWebHistory } from 'vue-router'

import aboutRouter from '@/views/About/router'
import homeRouter from '@/views/Home/router'
import contactRouter from '@/views/Contact/router'
import enterprisesRouter from '@/views/Enterpreses/router'
import eventsRouter from '@/views/Events/router'
import newsRouter from '@/views/Posts/router'
import scrollRestoration from '../plugins/scrollRestoration'
import expoRouter from '@/views/Expo/router'
import tenderRoutes from '@/views/Tenders/router'
import paperRoutes from '@/views/Papers/router'
import servicesRoutes from '@/views/Services/router'

const withScroll = (route) => ({
  ...route,
  meta: {
    ...(route.meta || {}),
    saveScroll: true,
    restoreScroll: true,
    scrollContainer: '.ant-table-body',
  },
})
const routes = [
  ...[
    ...aboutRouter,
    ...homeRouter,
    ...contactRouter,
    ...enterprisesRouter,
    ...eventsRouter,
    ...newsRouter,
    ...expoRouter,
    ...tenderRoutes,
    ...paperRoutes,
    ...servicesRoutes,
  ].map((row) => withScroll(row)),
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { left: 0, top: 0 }
  },
})

scrollRestoration(router)

// router.beforeEach(async (to, from, next) => {
//   return next()
// })

export default router
