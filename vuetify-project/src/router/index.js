import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../components/Landing.vue'
import Partida from "../components/partida.vue";
import Final from "../components/Final.vue";
import Lobby from "../components/Lobby.vue";
import Rooms from "../components/Rooms.vue";
import CrearPartida from "../components/CrearPartida.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Tutorial from "../components/Tutorial.vue";
import TorneigVisual from "../components/TorneigVisual.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
    },{
      path: '/tutorial',
      name: 'Tutorial',
      component: Tutorial
    },{
      path: '/torneig',
      name: 'Torneig',
      component: TorneigVisual
    }
  ]
})

//asdf
export default router
