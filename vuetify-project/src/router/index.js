import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../components/Landing.vue'
import Partida from "../components/partida.vue";
import Final from "../components/Final.vue";
import Lobby from "../components/Lobby.vue";
import Rooms from "../components/Rooms.vue";
import CrearPartida from "../components/CrearPartida.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import CrearPregunta from "../components/CrearPregunta.vue";
import Tutorial from "../components/Tutorial.vue";

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
      path: '/crearpregunta',
      name: 'crearpregunta',
      component: CrearPregunta
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
    }
  ]
})

//asdf
export default router
