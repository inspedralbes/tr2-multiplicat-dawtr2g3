import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../components/Landing.vue'
import Partida from "../components/Partida.vue";
import Final from "../components/Final.vue";
import Lobby from "../components/Lobby.vue";
import Rooms from "../components/Rooms.vue";
import CrearPartida from "../components/CrearPartida.vue";
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
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby
    },{
      path: '/partides',
      name: 'partides',
      component: Rooms
    },{
      path: '/crearPartida',
      name: 'CrearPartida',
      component: CrearPartida
    }
  ]
})

export default router
