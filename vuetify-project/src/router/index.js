import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../components/Landing.vue'
import Partida from "../components/Partida.vue";
import Final from "../components/Final.vue";
import Lobby from "../components/Lobby.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Register
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
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby
    }
  ]
})

export default router
