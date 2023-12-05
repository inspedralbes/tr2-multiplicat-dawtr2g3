<template>
  <h1>Final de la partida</h1>
  <div class="jugador" v-for="(jugador, index) in players">
    <span>Jugador: {{ jugador.nick }}</span><span>  Puntuació: {{ jugador.encertades }}</span>
  </div>
</template>
<script>
import { useAppStore } from "../stores/app.js";
import { computed } from 'vue';

export default {
  data() {
    const store = useAppStore();
    return {
      players: computed(() => store.players),
    };
  },
  methods: {

  },

  mounted() {

  },
  created() {

  },

}
</script>
