import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../components/Landing.vue'
import Partida from "../components/Partida.vue";
import Final from "../components/Final.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing
    },
    {
      path: '/partida',
      name: 'partida',
      component: Partida
    },
    {
      path: '/final',
      name: 'final',
      component: Final
    }
  ]
})

export default router
