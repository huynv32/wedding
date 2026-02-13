import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  { path: '/', component: App, name: 'home' },
  { path: '/wedding', component: App, name: 'wedding-bride' }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
