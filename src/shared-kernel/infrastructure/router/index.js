import { createRouter, createWebHistory } from 'vue-router'
import PageNotFoundComponent from '@/public/pages/page-not-found.component.vue'

// Importaciones de páginas
const HomePage = () => import('@/contexts/public/presentation/pages/home-page.page.vue')
const MachinesPage = () => import('@/contexts/public/presentation/pages/machines-page.page.vue')
const RentPage = () => import('@/contexts/public/presentation/pages/rent-page.page.vue')
const ContactPage = () => import('@/contexts/public/presentation/pages/contact-page.page.vue')
const LoginPage = () => import('@/contexts/auth/presentation/pages/login-page.page.vue')
const MachineControls = () =>
  import('@/contexts/public/presentation/pages/machine-controls.page.vue')

// Definición de rutas con metadatos
const routes = [
  // RUTAS PROTEGIDAS (Requieren autenticación)
  // Incluimos Home, ya que si no estás logueado, debe redirigir a Login.
  { path: '/', name: 'home', component: HomePage, meta: { requiresAuth: true } },
  { path: '/machines', name: 'machines', component: MachinesPage, meta: { requiresAuth: true } },
  { path: '/machines/:id', name: 'MachineControls', component: MachineControls, meta: { requiresAuth: true } },

  // RUTAS PÚBLICAS (No requieren autenticación)
  { path: '/rent', name: 'rent', component: RentPage, meta: { requiresAuth: false } },
  { path: '/contact', name: 'contact', component: ContactPage, meta: { requiresAuth: false } },

  // Ruta de Login: Nunca debe requerir autenticación
  { path: '/login', name: 'login', component: LoginPage, meta: { requiresAuth: false } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Navigation guard que utiliza los metadatos 'requiresAuth'
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  // Determina si la ruta requiere autenticación. Por defecto (si no tiene meta), es true.
  const requiresAuth = to.meta.requiresAuth ?? true

  if (requiresAuth && !isAuthenticated) {
    // Si la ruta es privada Y no estás logueado, ve a login.
    next({ name: 'login' })
  } else if (!requiresAuth && isAuthenticated && to.name === 'login') {
    // Si ya estás logueado y tratas de ir a login, ve a home.
    next({ name: 'home' })
  } else {
    // Continúa la navegación.
    next()
  }
})

export default router
