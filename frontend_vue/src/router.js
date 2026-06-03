import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Todos from './pages/Todos.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/todos', component: Todos },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
