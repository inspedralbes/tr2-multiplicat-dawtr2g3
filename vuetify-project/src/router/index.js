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
import Torneig from "../components/Torneig.vue";
import AnimacioDuelo from "../components/AnimacioDuelo.vue";
import Perdut from "../components/Perdut.vue";
import FinalTorneig from "../components/FinalTorneig.vue";
import crearPregunta from "../components/crearPregunta.vue";
import animacioPerdut from "../components/animacioPerdut.vue";
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
      path: '/torneigProfe',
      name: 'torneigProfe',
      component: TorneigVisual
    },{
      path: '/torneig',
      name: 'torneig',
      component: Torneig
    },{
      path: '/dueloanimacio',
      name: 'DueloAnimacio',
      component: AnimacioDuelo
    },{
      path: '/perdut',
      name: 'Perdut',
      component: Perdut
    },{
      path: '/finalTorneig',
      name: 'FinalTorneig',
      component: FinalTorneig
    },
    {
      path: '/crearpregunta',
      name: 'crearpregunta',
      component: crearPregunta,
      
    },{
      path: '/animacioPerdut',
      name: 'animacioPerdut',
      component: animacioPerdut,
    }

  ]
})

//asdf
export default router
