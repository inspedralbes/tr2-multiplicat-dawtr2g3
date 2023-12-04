// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../components/Landing.vue'
import Partida from "../components/partida.vue";
import Final from "../components/Final.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Landing
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
