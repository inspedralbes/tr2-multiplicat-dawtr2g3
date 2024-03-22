<template>
  <div><h1>{{ ownPlayer.nick }}</h1></div>
</template>

<script>
import { useAppStore } from "../store/app.js";
import { computed } from "vue";


export default {
  name: "Torneig",
  data() {
    const store = useAppStore();
    return {
      ownPlayer: computed(() => store.getOwnPlayer()),
    };
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
