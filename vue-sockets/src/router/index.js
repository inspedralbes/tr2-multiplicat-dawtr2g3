import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../components/Landing.vue'
import Votacions from "../components/Votacions.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing
    },
    {
      path: '/votacions',
      name: 'votacions',
      component: Votacions
    }
  ]
})

export default router
