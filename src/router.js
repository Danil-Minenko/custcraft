import { createRouter, createWebHistory } from 'vue-router'

import Home from '../src/pages/Home.vue'
import Donate from '../src/components/Donate.vue'
import Wiki from '../src/components/Wiki.vue'
import Privacy from '../src/pages/Privacy.vue'
import Offer from '../src/pages/Offer.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'CUSTCRAFT 2 - твой SMP сервер',
        description: 'Спокойный Minecraft сервер с экономикой, кланами, торговлей и развитием',
        canonical: 'https://custcraft.ru/'
      }
    },
    {
      path: '/donate',
      name: 'donate',
      component: Home,
      meta: {
        title: 'Премиум | CUSTCRAFT 2',
        description: 'Поддержка сервера и привилегии на CUSTCRAFT 2',
        canonical: 'https://custcraft.ru/donate'
      }
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: Home,
      meta: {
        title: 'Команды | CUSTCRAFT 2',
        description: 'Гайды сервера CUSTCRAFT 2.',
        canonical: 'https://custcraft.ru/wiki'
      }
    },
    {
      path: '/offer',
      name: 'offer',
      component: Offer,
      meta: {
        title: 'Оферта | CUSTCRAFT 2',
        description: 'Публичная оферта CUSTCRAFT 2.',
        canonical: 'https://custcraft.ru/offer'
      }
    },
    {
      path: '/policy',
      name: 'privacy',
      component: Privacy,
      meta: {
        title: 'Политика | CUSTCRAFT 2',
        description: 'Политика конфиденциальности CUSTCRAFT 2.',
        canonical: 'https://custcraft.ru/policy'
      }
    }
  ]
})

export default router