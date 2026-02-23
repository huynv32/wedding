import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Admin from './views/Admin.vue'

const routes = [
  { path: '/', component: App, name: 'home' },
  { path: '/wedding', component: App, name: 'wedding-bride' },
  { path: '/admin', component: Admin, name: 'admin' }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
