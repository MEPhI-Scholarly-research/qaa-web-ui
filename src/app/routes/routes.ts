import type { RouteRecordRaw } from 'vue-router'

import HomeView from '@/pages/home/index.vue'
import PlayView from '@/pages/play/index.vue'
import InvitePage from '@/pages/invite/index.vue'
import AuthPage from '@/pages/auth/index.vue'

export type Meta = {
  private: boolean
  show: boolean
  title: string
}

export type Route = RouteRecordRaw & { meta: Meta }

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Главная',
      private: false,
      show: true
    }
  },
  {
    path: '/invite',
    name: 'invite',
    component: InvitePage,
    meta: {
      title: 'Играть',
      private: false,
      show: true
    }
  },
  {
    path: '/play',
    name: 'play',
    component: PlayView,
    meta: {
      title: 'Play',
      private: false,
      show: false
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage,
    meta: {
      title: 'Авторизация',
      private: false,
      show: false
    }
  }
]
