<template>
  <div>
    
    <div  class="pantallaVersus">
      
      <div class="avatarJugador">
        <img v-if="ownPlayer.avatar == 1" class="avatar" src="../assets/avatar/avatarVaiolet.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 2" class="avatar" src="../assets/avatar/avatarCerdo.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 3" class="avatar" src="../assets/avatar/avatarEric.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 4" class="avatar" src="../assets/avatar/avatarGatoSuperman.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 5" class="avatar" src="../assets/avatar/avatarHamsterTrex.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 6" class="avatar" src="../assets/avatar/avatarHombrePeloBlanco.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 7" class="avatar" src="../assets/avatar/avatarLevie.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 8" class="avatar" src="../assets/avatar/avatarMikasa.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 9" class="avatar" src="../assets/avatar/avatarMujerPeloRojo.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 10" class="avatar" src="../assets/avatar/avatarPerroBatman.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 11" class="avatar" src="../assets/avatar/avatarPerroDJ.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 12" class="avatar" src="../assets/avatar/avatarPower.png" alt="icono avatar">
        <img v-else-if="ownPlayer.avatar == 13" class="avatar" src="../assets/avatar/avatarZorro.png" alt="icono avatar">
        <h1>{{ ownPlayer.nick }}</h1>
      </div>

      <div class="iconoVersus">
        <img src="../assets/icono/versus.png" alt="icono versus">
      </div>
    
      
      <div v-if="state=='matchup'" class="avatarOponent">
        <h1>{{ ownPlayer.oponent.nick }}</h1>

        <img v-if="ownPlayer.oponent.avatar == 1" class="avatar" src="../assets/avatar/avatarVaiolet.png" alt="icono avatar">
        <img v-else-if="ownPlayer.oponent.avatar == 2" class="avatar" src="../assets/avatar/avatarCerdo.png" alt="icono avatar">
        <img v-else-if="ownPlayer.oponent.avatar == 3" class="avatar" src="../assets/avatar/avatarEric.png" alt="icono avatar">
        <img v-else-if="ownPlayer.oponent.avatar == 4" class="avatar" src="../assets/avatar/avatarGatoSuperman.png" alt="icono avatar">
        <img v-else-if="ownPlayer.oponent.avatar == 5" class="avatar" src="../assets/avatar/avatarHamsterTrex.png" alt="icono avatar">
        <img v-else-if="ownPlayer.oponent.avatar == 6" class="avatar" src="../assets/avatar/avatarHombrePeloBlanco.png" alt="icono avatar">
        <img v-else-if="ownPlayer.oponent.avatar == 7" class="avatar" src="../assets/avatar/avatarLevie.png" alt="icono avatar">
        <img v-else-if="ownPlayer.oponent.avatar == 8" class="avatar" src="../assets/avatar/avatarMikasa.png" alt="icono avatar">
        <img v-else-if="ownPlayer.oponent.avatar == 9" class="avatar" src="../assets/avatar/avatarMujerPeloRojo.png" alt="icono avatar">
        <img v-else-if="ownPlayer.oponent.avatar == 10" class="avatar" src="../assets/avatar/avatarPerroBatman.png" alt="icono avatar">
        <img v-else-if="ownPlayer.oponent.avatar == 11" class="avatar" src="../assets/avatar/avatarPerroDJ.png" alt="icono avatar">
        <img v-else-if="ownPlayer.oponent.avatar == 12" class="avatar" src="../assets/avatar/avatarPower.png" alt="icono avatar">
        <img v-else-if="ownPlayer.oponent.avatar == 13" class="avatar" src="../assets/avatar/avatarZorro.png" alt="icono avatar">
      </div>

      <div v-if="state=='esperant'" class="esperant">
        <h2>Esperant contrincant<span v-for="dot in dots" :key="dot.id">.</span></h2>
      </div>
      <div v-else class="esperant">
        <h2>Esperant al professor<span v-for="dot in dots" :key="dot.id">.</span></h2>
      </div>
      
    </div>    

  </div>
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
      state: computed(() => store.getTourneigState()),
      pantalla: computed(() => store.getPantalla()),
      ownPlayer: computed(() => store.getOwnPlayer()),
      dots: 0,
    };
  },
  components: {
    partidaTorneig,
  },
  methods: {

  },
  mounted() {
    setInterval(() => {
      this.dots = (this.dots + 1) % 4;
    }, 1000)
  }
};
</script>

<style lang="scss" scoped>
.pantallaVersus{
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 0.5fr 1fr;
  justify-content: center;
  align-items: center;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
}
.avatarJugador{
  grid-column: 1;
  grid-row: 1/4;
  justify-self: center;
  align-self: center;
}
.pantallaVersus * h1{
  background-color: rgb(255, 255, 255);
  border-radius: 50px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  margin: auto;
}
.iconoVersus{
  grid-column: 2;
  grid-row: 2/5;
  justify-self: center;
  align-self: center;
}
.avatarOponent{
  grid-column: 3;
  grid-row: 3/-1;
  justify-self: center;
  align-self: center;
}
.esperant{
  grid-column: 3;
  justify-self: center;
  align-self: center;
}
.iconoVersus img{
  height: 50vh;
  width: 50vh;
}
.avatar {
  width: 50vh;
  height: 5%;
}
</style>
