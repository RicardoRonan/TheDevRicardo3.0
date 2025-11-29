import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Projects from '../pages/Projects.vue'
import About from '../pages/About.vue'
import Tools from '../pages/Tools.vue'
import Contact from '../pages/Contact.vue'
import Testimonials from '../pages/Testimonials.vue'
import Blog from '../pages/Blog.vue'
// import Services from '../pages/Services.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  // {
  //   path: '/services',
  //   name: 'Services',
  //   component: Services
  // },
  {
    path: '/tools',
    name: 'Tools',
    component: Tools
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
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
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
