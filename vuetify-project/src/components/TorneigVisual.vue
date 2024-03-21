<template>
  <div></div>

  <div id="example" ref="example" class="brackets-viewer"></div>
</template>

<script>
import { useAppStore } from "../store/app.js";

import "brackets-viewer/dist/brackets-viewer.min.css";
import "brackets-viewer/dist/brackets-viewer.min.js";
import { computed } from "vue";

export default {
  data() {
    const store = useAppStore();
    return {
      data: computed(() => store.getTorneigInfo()),
    };
  },
  methods: {

    async pintar() {
      this.$refs.example?.replaceChildren();

      window.bracketsViewer.onMatchClicked = async (match) => {
        this.idModificar = match.id;
        console.log(this.data);
        // console.log(this.manager);
        // try {
          // console.log(this.manager);
          // await this.manager.update.match({
          //   id: match.id,
          //   opponent1: { score: 5 },
          //   opponent2: { score: 7, result: "win" },
          // });
          // console.log(this.manager);
          // const tourneyData = await this.manager.get.stageData(0);
          // console.log(tourneyData);
          // this.data = tourneyData;
        // } catch (error) {}
      };

      if (this.data && this.data.participant !== null) {
        // This is optional. You must do it before render().
        window.bracketsViewer.setParticipantImages(
          this.data.participant.map((participant) => ({
            participantId: participant.id,
            imageUrl: "https://github.githubassets.com/pinned-octocat.svg",
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
  },
  async mounted() {
    await this.pintar();
  },
  computed: {

  },
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
  height: 100vh;
}

.centrar * {
  font-size: larger;
}

.brackets-viewer {
  background: none;
}
</style>
