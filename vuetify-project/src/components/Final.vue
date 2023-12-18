<template>
  <h1>Final de la partida</h1>
  <h1>Guanyador: {{ guanyador.nick }}</h1>
  <h2>Perdedors</h2>
  <div class="jugador" v-for="(jugador, index) in perdedors">
    <span>Jugador: {{ jugador.nick }}</span> <div>Temps aguantat: {{ jugador.temps % 1000 / 10 }}s</div>
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
      guanyador: computed(() => store.guanyador),
      perdedors: computed(() => store.perdedors),
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
