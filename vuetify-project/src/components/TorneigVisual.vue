<template>
  <div></div>

  <div id="example" ref="example" class="brackets-viewer centrar"></div>

  <div class="caixaBtn">
    <button class="nextBtn" @click="startNextRound()">
      Començar noves partides
    </button>
  </div>

  <!-- <div v-if="endGame" :class="endGame ? 'apareixer' : 'desapareixer'"> -->
  <!-- <v-overlay :activator="endGame">
      <v-card
        class="tarjeta"
        title="Forçar una victòria"
        subtitle="Clica en una persona i confirma per a forçar una victòria"
        width="400"
      ></v-card>
    </v-overlay> -->
  <v-overlay
    :model-value="endGame"
    class="align-center justify-center"
    @click:outside="endGame = false"
  >
    <v-card
      elevation="16"
      class="tarjeta"
      title="Forçar una victòria"
      subtitle="Clica en una persona i confirma per a forçar una victòria"
      width="400"
    >
      <v-card-actions>
        <v-btn variant="tonal" height="70">
          <v-img 
          :aspect-ratio="1"
          :src="this.avatars[this.data.participant[match.opponent1.id].avatar - 1]"
          cover
          width="50"
          ></v-img>
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn variant="tonal" height="70">
          <v-img 
          :aspect-ratio="1"
          :src="this.avatars[this.data.participant[match.opponent2.id].avatar - 1]"
          cover
          width="50"
          ></v-img>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
  <!-- </div> -->
</template>

<script>
import { socket } from "@/socket";
import { useAppStore } from "../store/app.js";

import "../assets/css/torneigVisual.css";
import "brackets-viewer/dist/brackets-viewer.min.css";
import "brackets-viewer/dist/brackets-viewer.min.js";
import { computed } from "vue";

export default {
  data() {
    const store = useAppStore();
    return {
      data: computed(() => store.getTorneigInfo()),
      endGame: false,
      avatars: [
        "/src/assets/avatar/avatarVaiolet.png",
        "/src/assets/avatar/avatarCerdo.png",
        "/src/assets/avatar/avatarEric.png",
        "/src/assets/avatar/avatarGatoSuperman.png",
        "/src/assets/avatar/avatarHamsterTrex.png",
        "/src/assets/avatar/avatarHombrePeloBlanco.png",
        "/src/assets/avatar/avatarLevie.png",
        "/src/assets/avatar/avatarMikasa.png",
        "/src/assets/avatar/avatarMujerPeloRojo.png",
        "/src/assets/avatar/avatarPerroBatman.png",
        "/src/assets/avatar/avatarPerroDJ.png",
        "/src/assets/avatar/avatarPower.png",
        "/src/assets/avatar/avatarZorro.png",
      ],
    };
  },
  methods: {
    async pintar() {
      this.$refs.example?.replaceChildren();

      window.bracketsViewer.onMatchClicked = async (match) => {
        console.log(this.data.participant[match.opponent1.id].name);
        console.log(this.data.participant[match.opponent2.id].name);
        this.endGame = true;
      };

      if (this.data && this.data.participant !== null) {
        // This is optional. You must do it before render().
        window.bracketsViewer.setParticipantImages(
          this.data.participant.map((participant) => ({
            participantId: participant.id,
            imageUrl: this.avatars[participant.avatar - 1],
          }))
        );

        window.bracketsViewer.render(
          {
            stages: this.data.stage,
            matches: this.data.match,
            matchGames: this.data.match_game,
            participants: this.data.participant,
          },
          {
            customRoundName: (info, t) => {
              // You have a reference to `t` in order to translate things.
              // Returning `undefined` will fallback to the default round name in the current language.
              if (info.fractionOfFinal === 1 / 2) {
                if (info.groupType === "single-bracket") {
                  // Single elimination
                  return "Semi Finals";
                } else {
                  // Double elimination
                  return `${t(`abbreviations.${info.groupType}`)} Semi Finals`;
                }
              }
              if (info.fractionOfFinal === 1 / 4) {
                return "Quarter Finals";
              }

              if (info.finalType === "grand-final") {
                if (info.roundCount > 1) {
                  return `${t(`abbreviations.${info.finalType}`)} Final Round ${
                    info.roundNumber
                  }`;
                }
                return `Grand Final`;
              }
            },
            participantOriginPlacement: "before",
            separatedChildCountLabel: true,
            showSlotsOrigin: true,
            showLowerBracketSlotsOrigin: true,
            highlightParticipantOnHover: true,
          }
        );
      }
    },

    startNextRound() {
      console.log("start round");
      socket.emit("start round");
    },
  },
  async mounted() {
    await this.pintar();
  },
  computed: {},
  watch: {
    data: {
      handler() {
        this.pintar();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.centrar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.centrar * {
  font-size: larger;
}

.brackets-viewer {
  background: none;
}

.caixaBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nextBtn {
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
}

.tarjeta {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.fonsTarjeta {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
</style>
