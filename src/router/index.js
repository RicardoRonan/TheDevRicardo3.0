import { createRouter, createWebHistory } from 'vue-router'
import Portfolio from '../components/Portfolio.vue'
import Projects from '../components/Projects.vue'
import AboutPage from '../components/AboutPage.vue'
import Resources from '../components/Resources.vue'
import Contact from '../components/Contact.vue'
import Testimonials from '../components/Testimonials.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Portfolio
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/testimonials',
    name: 'Testimonials',
    component: Testimonials
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating to a new page
    return { top: 0 }
  }
})

export default router
