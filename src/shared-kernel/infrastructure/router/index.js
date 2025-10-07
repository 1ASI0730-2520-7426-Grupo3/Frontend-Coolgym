import { createRouter, createWebHistory } from 'vue-router'
import PageNotFoundComponent from '@/public/pages/page-not-found.component.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../../../contexts/auth/presentation/pages/login-page.page.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../../../contexts/public/presentation/pages/home-page.page.vue'),
    },
    {
      path: '/account-statement',
      name: 'account-statement',
      component: () => import('@/contexts/account-statement/pages/account-statement.page.vue'),
    },
    {
      path: '/machines',
      name: 'machines',
      component: () => import('../../../contexts/public/presentation/pages/machines-page.page.vue'),
    },
    {
      path: '/rent',
      name: 'rent',
      component: () => import('../../../contexts/public/presentation/pages/rent-page.page.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../../../contexts/public/presentation/pages/contact-page.page.vue'),
    },
    {
      path: '/maintenance',
      name: 'maintenance',
      component: () => import('@/contexts/maintenance/pages/maintenance-page.vue'),

    },
    {path: '/', name: 'default', redirect: {name: 'home'}},
    {path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFoundComponent, meta: {title: 'Page not found'}},
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  if (!isAuthenticated && to.name !== 'login') {
    next({ name: 'login' })
  } else if (isAuthenticated && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
