import { createRouter, createWebHistory } from 'vue-router'
import { routes, type Meta } from './routes'
import { isAuth } from '@/shared/utils/auth/isAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// authorization

router.beforeEach((to, from, next) => {
  const path = to.path
  const query = JSON.stringify(to.query)

  if (to.matched.some((route) => (route.meta as Meta).private)) {
    if (isAuth()) {
      next()
    } else {
      next({ name: 'auth', query: { path, query } })
    }
  } else {
    next()
  }
})

export default router
