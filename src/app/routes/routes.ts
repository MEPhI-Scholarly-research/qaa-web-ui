import type { RouteRecordRaw } from 'vue-router'

import HomeView from '@/pages/home/index.vue'
import AboutView from '@/pages/about/index.vue'
import InvitePage from '@/pages/invite/index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/invite',
    name: 'invite',
    component: InvitePage
  },
  {
    path: '/play',
    name: 'play',
    component: AboutView
  }
]
