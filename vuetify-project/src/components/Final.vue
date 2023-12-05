<template>
  <h1>Final de la partida</h1>
  <div class="jugador" v-for="(jugador, index) in players">
    <span>Jugador: {{ jugador.nick }}</span><span>  Puntuació: {{ jugador.encertades }}</span>
  </div>
<button @click="$router.push('/');">Tornar a jugar</button>
</template>

<script>
import { useAppStore } from "../store/app.js";
import { computed } from 'vue';
import router from '@/router'

export default {
  data() {
    const store = useAppStore();
    return {
      players: computed(() => store.players),
    };
  },
  methods: {
    tornar(){
      router.push('/');
    }
  },

  mounted() {

  },
  created() {

  },

}
</script>
