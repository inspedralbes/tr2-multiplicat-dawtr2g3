<template>
  <div><h1>{{ ownPlayer.nick }}</h1></div>
  <partidaTorneig v-if="pantalla == 'partida'" />
</template>

<script>
import { useAppStore } from "../store/app.js";
import { computed } from "vue";
import partidaTorneig from "./PartidaTorneig.vue";

export default {
  name: "Torneig",
  data() {
    const store = useAppStore();
    return {
      pantalla: computed(() => store.getPantalla()),
      ownPlayer: computed(() => store.getOwnPlayer()),
    };
  },
  components: {
    partidaTorneig,
  },
  methods: {

  },
  mounted() {
    setTimeout(() => {
      console.log(this.ownPlayer)
    }, 500)
  }
};
</script>

<style lang="scss" scoped>
</style>
