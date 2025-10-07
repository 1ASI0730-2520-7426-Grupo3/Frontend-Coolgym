import { createRouter, createWebHistory } from 'vue-router'

const HomePage     = () => import('@/contexts/public/presentation/pages/home-page.page.vue')
const MachinesPage = () => import('@/contexts/public/presentation/pages/machines-page.page.vue')
const RentPage     = () => import('@/contexts/public/presentation/pages/rent-page.page.vue')
const ContactPage  = () => import('@/contexts/public/presentation/pages/contact-page.page.vue')
const LoginPage    = () => import('@/contexts/auth/presentation/pages/login-page.page.vue')

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/machines', name: 'machines', component: MachinesPage },
  { path: '/rent', name: 'rent', component: RentPage },
  { path: '/contact', name: 'contact', component: ContactPage },
  { path: '/login', name: 'login', component: LoginPage }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, scrollBehavior() { return { top: 0 } }
})

// Navigation guard to redirect to login if not authenticated
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

