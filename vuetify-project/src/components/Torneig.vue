<template>
  <div>
    <div v-if="state != 'partida'" class="pantallaVersus">
      <div class="avatarJugador avatar1">
        <img
          v-if="ownPlayer.avatar == 1"
          class="avatar"
          src="../assets/avatar/avatarVaiolet.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.avatar == 2"
          class="avatar"
          src="../assets/avatar/avatarCerdo.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.avatar == 3"
          class="avatar"
          src="../assets/avatar/avatarEric.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.avatar == 4"
          class="avatar"
          src="../assets/avatar/avatarGatoSuperman.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.avatar == 5"
          class="avatar"
          src="../assets/avatar/avatarHamsterTrex.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.avatar == 6"
          class="avatar"
          src="../assets/avatar/avatarHombrePeloBlanco.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.avatar == 7"
          class="avatar"
          src="../assets/avatar/avatarLevie.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.avatar == 8"
          class="avatar"
          src="../assets/avatar/avatarMikasa.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.avatar == 9"
          class="avatar"
          src="../assets/avatar/avatarMujerPeloRojo.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.avatar == 10"
          class="avatar"
          src="../assets/avatar/avatarPerroBatman.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.avatar == 11"
          class="avatar"
          src="../assets/avatar/avatarPerroDJ.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.avatar == 12"
          class="avatar"
          src="../assets/avatar/avatarPower.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.avatar == 13"
          class="avatar"
          src="../assets/avatar/avatarZorro.png"
          alt="icono avatar"
        />
        <h1>{{ ownPlayer.nick }}</h1>
      </div>

      <div class="iconoVersus">
        <img src="../assets/icono/versus.png" alt="icono versus" />
      </div>

      <div v-if="state == 'matchup'" class="avatarOponent avatar2">
        <h1>{{ ownPlayer.oponent.nick }}</h1>

        <img
          v-if="ownPlayer.oponent.avatar == 1"
          class="avatar"
          src="../assets/avatar/avatarVaiolet.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.oponent.avatar == 2"
          class="avatar"
          src="../assets/avatar/avatarCerdo.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.oponent.avatar == 3"
          class="avatar"
          src="../assets/avatar/avatarEric.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.oponent.avatar == 4"
          class="avatar"
          src="../assets/avatar/avatarGatoSuperman.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.oponent.avatar == 5"
          class="avatar"
          src="../assets/avatar/avatarHamsterTrex.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.oponent.avatar == 6"
          class="avatar"
          src="../assets/avatar/avatarHombrePeloBlanco.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.oponent.avatar == 7"
          class="avatar"
          src="../assets/avatar/avatarLevie.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.oponent.avatar == 8"
          class="avatar"
          src="../assets/avatar/avatarMikasa.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.oponent.avatar == 9"
          class="avatar"
          src="../assets/avatar/avatarMujerPeloRojo.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.oponent.avatar == 10"
          class="avatar"
          src="../assets/avatar/avatarPerroBatman.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.oponent.avatar == 11"
          class="avatar"
          src="../assets/avatar/avatarPerroDJ.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.oponent.avatar == 12"
          class="avatar"
          src="../assets/avatar/avatarPower.png"
          alt="icono avatar"
        />
        <img
          v-else-if="ownPlayer.oponent.avatar == 13"
          class="avatar"
          src="../assets/avatar/avatarZorro.png"
          alt="icono avatar"
        />
      </div>

      <div v-if="state == 'esperant'" class="esperant">
        <h2>
          Esperant contrincant<span v-for="dot in dots" :key="dot.id">.</span>
        </h2>
      </div>
      <div v-else class="esperant">
        <h2>
          Esperant al professor<span v-for="dot in dots" :key="dot.id">.</span>
        </h2>
      </div>
    </div>
    <partidaTorneig :ownPlayer="ownPlayer" v-else />
    <button @click="() => (guanyat = !guanyat)">HOLAAA</button>
    <button @click="() => (perdut = !perdut)">ADEEEEEEU</button>
  </div>

  <v-overlay
    :model-value="guanyat"
    class="align-center justify-center"
    @click:outside="tancarGuanyat()"
  >
    <v-card
      color="#9afa93"
      elevation="16"
      class="tarjeta paddingB"
      title="Victòria!"
      subtitle="Molt bé! Has guanyat! Passes a la següent ronda!"
      text="Clica fora per a tancar la finestra"
      width="400"
      v-if="guanyat"
    >
    </v-card>
  </v-overlay>
  <v-overlay
    :model-value="perdut"
    class="align-center justify-center"
    @click:outside="tancarPerdut()"
  >
    <v-card
      color="#fc8d8d"
      elevation="16"
      class="tarjeta paddingB"
      title="Derrota..."
      subtitle="Has perdut, però no et preocupis! Encara tens una altra oportunitat!"
      text="Clica fora per a tancar la finestra"
      width="500"
      v-if="perdut"
    >
    </v-card>
  </v-overlay>
</template>

<script>
import { useAppStore } from "../store/app.js";
import { computed } from "vue";
import partidaTorneig from "./partidaTorneig.vue";

export default {
  name: "Torneig",
  data() {
    const store = useAppStore();
    return {
      state: computed(() => store.getTourneigState()),
      ownPlayer: computed(() => store.getOwnPlayer()),
      dots: 0,
      guanyat: computed(() => store.getGuanyat()),
      perdut: computed(() => store.getPerdut()),
    };
  },
  components: {
    partidaTorneig,
  },
  methods: {
    tancarPerdut() {
      const store = useAppStore();
      store.setPerdut(false);
    },
    tancarGuanyat() {
      const store = useAppStore();
      store.setGuanyat(false);
    },
  },
  mounted() {
    setInterval(() => {
      this.dots = (this.dots + 1) % 4;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.pantallaVersus {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 0.5fr 1fr;
  justify-content: center;
  align-items: center;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
}
.avatarJugador {
  grid-column: 1;
  grid-row: 1/4;
  justify-self: center;
  align-self: center;
}
.pantallaVersus * h1 {
  background-color: rgb(255, 255, 255);
  border-radius: 50px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  margin: auto;
}
.iconoVersus {
  grid-column: 2;
  grid-row: 2/5;
  justify-self: center;
  align-self: center;
}
.avatarOponent {
  grid-column: 3;
  grid-row: 3/-1;
  justify-self: center;
  align-self: center;
}
.esperant {
  grid-column: 3;
  justify-self: center;
  align-self: center;
}
.iconoVersus img {
  height: 50vh;
  width: 50vh;
}
.avatar {
  width: 50vh;
  height: 5%;
}
.avatar1 {
  animation: avatar1 2s ease-in-out;
}

@keyframes avatar1 {
  0% {
    transform: translateX(-100%);
  }

  65% {
    transform: translateX(0%);
  }
}

.avatar2 {
  animation: avatar2 2s ease-in-out;
}

@keyframes avatar2 {
  0% {
    transform: translateX(100%);
  }

  65% {
    transform: translateX(0%);
  }
}
</style>
