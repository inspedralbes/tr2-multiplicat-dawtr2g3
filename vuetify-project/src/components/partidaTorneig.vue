<template>
  <div class="container__partida">
    <div class="container__preguntas preguntas">
      <Drag
        :respostes="game.question.respostes"
        :pregunta="game.question.pregunta"
        @comprovar="(index) => answer(index)"
      />
    </div>
    <div class="container__jugadors">
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
        <h1 class="ownPlayerNick">{{ ownPlayer.nick }}</h1>
      </div>
      <div class="containerEncertaresOwnPlayer">
        <div class="containerIcons">
          <div
            v-for="(item, index) in nEncertades"
            :key="index"
            class="encertades"
          >
            <div v-if="ownPlayer.infoPartida.encertades > index">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3em"
                height="3em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="none"
                  stroke="#3df200"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="m2.75 8.75l3.5 3.5l7-7.5"
                />
              </svg>
            </div>
            <div v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3em"
                height="3em"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M128 80a48 48 0 1 0 48 48a48 48 0 0 0-48-48m0 60a12 12 0 1 1 12-12a12 12 0 0 1-12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="containerEncertadesOponent">
        <div class="containerIcons">
          <div
            v-for="(item, index) in nEncertades"
            :key="index"
            class="encertades"
          >
            <div v-if="ownPlayer.oponent.encertades > 4 - index">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3em"
                height="3em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="none"
                  stroke="#3df200"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="m2.75 8.75l3.5 3.5l7-7.5"
                />
              </svg>
            </div>
            <div v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3em"
                height="3em"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M128 80a48 48 0 1 0 48 48a48 48 0 0 0-48-48m0 60a12 12 0 1 1 12-12a12 12 0 0 1-12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="avatarOponent avatar2">
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
        <h1 class="oponentNick">{{ ownPlayer.oponent.nick }}</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container__partida {
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: 100vh;
}

.avatar {
  height: 30vh;
}

.container__jugadors {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr 1fr;
  justify-content: center;
  align-items: center;
}

.avatarOponent {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  margin-right: 10vh;
  grid-column: 5;
}

.avatarJugador {
  margin-left: 10vh;
  grid-column: 2
}

.oponentNick {
  margin-right: 14vh;
}

.ownPlayerNick {
  margin-left: 14vh;
}

.containerEncertaresOwnPlayer {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 5vh;
  grid-column: 3;
}

.containerEncertadesOponent {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  height: 100%;
  margin-right: 5vh;
  grid-column: 4;
}

.containerIcons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border: 1px solid black;
  background-color: white;
  border-radius: 10px;
  padding-top: 7px;
}
</style>

<script>
import { socket } from "../socket";
import { computed } from "vue";
import { useAppStore } from "../store/app.js";
import Drag from "./Drag.vue";
import store from "@/store";
export default {
  props: {
    ownPlayer: Object,
  },
  data() {
    const store = useAppStore();

    return {
      nEncertades: 5,
      state: {
        loading: false,
        error: false,
      },
      game: {
        question: computed(() => store.question),        notFirstQuestion: false,
        dialog: false,
      },
      timerInterval: null,
      disabled: false,
    };
  },
  components: { Drag },

  methods: {
    /**
     * respon a la pregunta
     * @param {int} index index de la resposta
     */
    answer(index) {
      this.game.notFirstQuestion = true;
      socket.emit("answer torneig", this.game.question.idPregunta, index);
    },
  },

  mounted() {
    this.state.loading = false;
  },
};
</script>
