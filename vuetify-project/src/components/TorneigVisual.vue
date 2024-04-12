<template>
  <div></div>

  <div id="example" ref="example" class="brackets-viewer centrar"></div>

  <div class="caixaBtn">
    <v-btn class="nextBtn" @click="startNextRound()">
      Començar noves partides
    </v-btn>
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
      class="tarjeta paddingB"
      title="Forçar una victòria"
      subtitle="Clica en un participant per a forçar una victòria"
      width="400"
      v-if="endGame"
    >
      <v-card-actions class="centrarX">
        <v-btn variant="tonal" height="70" @click="forçarVictoria(1)">
          <v-img
            :aspect-ratio="1"
            :src="avatars[data.participant[opponents.opponent1].avatar - 1]"
            cover
            width="50"
          ></v-img>
          <div class="marginL">
            {{ data.participant[opponents.opponent1].name }}
          </div>
        </v-btn>
      </v-card-actions>
      <v-card-actions class="centrarX">
        <v-btn variant="tonal" height="70" @click="forçarVictoria(2)">
          <v-img
            :aspect-ratio="1"
            :src="avatars[data.participant[opponents.opponent2].avatar - 1]"
            cover
            width="50"
          ></v-img>
          <div class="marginL">
            {{ data.participant[opponents.opponent2].name }}
          </div>
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
      players: computed(() => store.getPlayers()),
      opponents: { opponent1: null, opponent2: null },
      matchID: null,
      endGame: false,
      avatars: [
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarVaiolet.png",
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarCerdo.png",
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarEric.png",
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarGatoSuperman.png",
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarHamsterTrex.png",
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarHombrePeloBlanco.png",
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarLevie.png",
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarMikasa.png",
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarMujerPeloRojo.png",
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarPerroBatman.png",
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarPerroDJ.png",
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarPower.png",
        "http://mathroyale.daw.inspedralbes.cat/avatars/avatarZorro.png",
      ],
    };
  },
  methods: {
    async pintar() {
      this.$refs.example?.replaceChildren();

      window.bracketsViewer.onMatchClicked = async (match) => {
        if (match.status == 2 || match.status == 3) {
          this.opponents.opponent1 = match.opponent1.id;
          this.opponents.opponent2 = match.opponent2.id;
          this.endGame = true;
          this.matchID = match.id;
        }
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
      socket.emit("start round");
    },
    forçarVictoria(ordre) {
      this.endGame = false;

      socket.emit("force win", {
        guanyador:
          ordre == 1 ? this.opponents.opponent1 : this.opponents.opponent2,
        perdedor:
          ordre == 1 ? this.opponents.opponent2 : this.opponents.opponent1,
        ordre: ordre,
        matchID: this.matchID,
      });
    },
  },
  async mounted() {
    await this.pintar();
    setTimeout(() => {
      const store = useAppStore();
      const bracketsViewer = document.querySelector(".brackets-viewer");

      if (navigator.userAgent.indexOf("Firefox") == -1) {
        bracketsViewer.style.margin = "0 0";
        bracketsViewer.style.padding = "0 0";
        switch (store.getPlayers().length) {
          case 4:
            bracketsViewer.style.zoom = "1.7";
            break;
          case 8:
            bracketsViewer.style.zoom = "1.2";
            break;
          default:
            bracketsViewer.style.zoom = "1";
        }
      } else {
        switch (store.getPlayers().length) {
          case 4:
            bracketsViewer.style.setProperty("--text-size", "22px");
            bracketsViewer.style.setProperty("--round-margin", "114px");
            bracketsViewer.style.setProperty("--match-width", "231px");
            bracketsViewer.style.setProperty(
              "--match-horizontal-padding",
              "14px"
            );
            bracketsViewer.style.setProperty(
              "--match-vertical-padding",
              "12px"
            );
            bracketsViewer.style.setProperty("--match-border-radius", "0.5em");
            break;
          case 8:
            bracketsViewer.style.setProperty("--text-size", "17px");
            bracketsViewer.style.setProperty("--round-margin", "82px");
            bracketsViewer.style.setProperty("--match-width", "192px");
            bracketsViewer.style.setProperty(
              "--match-horizontal-padding",
              "13px"
            );
            bracketsViewer.style.setProperty(
              "--match-vertical-padding",
              "9px"
            );
            bracketsViewer.style.setProperty("--match-border-radius", "0.4em");
            break;
          default:
            bracketsViewer.style.zoom = "1";
        }
      }
    }, 50);
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
}

.centrarX {
  display: flex;
  justify-content: center;
}

.marginL {
  margin-left: 10px;
}

.paddingB {
  padding-bottom: 20px;
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
  padding: 5px;
  background-color: antiquewhite;
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
