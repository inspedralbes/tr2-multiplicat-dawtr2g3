<template>
  <button @click="async() => await this.guanya1()">GUANYA 1</button>
  <button @click="async() => await this.guanya2()">GUANYA 2</button>

  <div id="example" ref="example" class="brackets-viewer"></div>
</template>

<script>
import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager } from "brackets-manager";

import "brackets-viewer/dist/brackets-viewer.min.css";
import "brackets-viewer/dist/brackets-viewer.min.js";

export default {
  data() {
    return {
      data: {},
      storage: new InMemoryDatabase(),
      manager: null,
      idModificar: null,
    };
  },
  methods: {
    async guanya1() {
      await this.manager.update.match({
            id: this.idModificar,
            opponent1: { score: 2, result: "win" },
            opponent2: { score: 1 },
          });

          const tourneyData = await this.manager.get.stageData(0);
          this.data = tourneyData;
    },
    async guanya2() {
      await this.manager.update.match({
            id: this.idModificar,
            opponent1: { score: 1 },
            opponent2: { score: 2, result: "win" },
          });

          const tourneyData = await this.manager.get.stageData(0);
          this.data = tourneyData;
    },

    async rendering() {
      await this.manager.create({
        //hardcoded
        id: 0,
        tournamentId: 0,
        name: "Example",
        type: "double_elimination",
        number: 1,
        seeding: Array(16)
          .fill(0)
          .map((e, i) => `Team ${i + 1}`),
        settings: {
          size: 16,
          seedOrdering: ["natural", "natural", "reverse_half_shift", "reverse"],
          grandFinal: "double",
          matchesChildCount: 0,
        },
      });
      const tournamentData = await this.manager.get.stageData(0);
      this.data = tournamentData;
    },

    async rerendering() {
      this.$refs.example?.replaceChildren();

      window.bracketsViewer.onMatchClicked = async (match) => {
        this.idModificar = match.id;
        // console.log(this.manager);
        // try {
          // console.log(this.manager);
          // await this.manager.update.match({
          //   id: match.id,
          //   opponent1: { score: 5 },
          //   opponent2: { score: 7, result: "win" },
          // });
          // console.log(this.manager);
          const tourneyData = await this.manager.get.stageData(0);
          console.log(tourneyData);
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
                  return `${t(`abbreviations.${info.groupType}`)} ESemi Finals`;
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
    this.manager = new BracketsManager(this.storage);

    await this.rendering();

    await this.rerendering();



    // this.data = await fetch("./src/assets/json/db.json").then((response) =>
    //   response.json()
    // );
    // window.bracketsViewer.setParticipantImages(
    //   this.data.participant.map((participant) => ({
    //     participantId: participant.id,
    //     imageUrl: "https://github.githubassets.com/pinned-octocat.svg",
    //   }))
    // );

    // await window.bracketsViewer.render(
    //   {
    //     stages: this.data.stage,
    //     matches: this.data.match,
    //     matchGames: this.data.match_game,
    //     participants: this.data.participant,
    //   },
    //   {
    //     customRoundName: (info, t) => {
    //       // You have a reference to `t` in order to translate things.
    //       // Returning `undefined` will fallback to the default round name in the current language.
    //       // console.log(info);

    //       if (info.fractionOfFinal === 1 / 2) {
    //         if (info.groupType === "single-bracket") {
    //           // Single elimination
    //           return "Semi Finals";
    //         } else {
    //           // Double elimination
    //           return `${t(`abbreviations.${info.groupType}`)} Semi Finals`;
    //         }
    //       }
    //     },
    //     onMatchClick: async (match) => {
    //       console.log(this.manager);
    //       await this.manager.update.match({
    //         id: match.id,
    //         opponent1: { score: 5 },
    //         opponent2: { score: 7, result: "win" },
    //       });
    //       const tourneyData2 = await this.manager.get.currentMatches(0);
    //       const tourneyData = await this.manager.get.stageData(0);

    //       console.log("A tourney", tourneyData2);
    //     },
    //     selector: "#example",
    //     participantOriginPlacement: "before",
    //     separatedChildCountLabel: true,
    //     showSlotsOrigin: true,
    //     showLowerBracketSlotsOrigin: true,
    //     highlightParticipantOnHover: true,
    //   }
    // );

    // this.$refs.bracketsViewerExample.style.setProperty('--primary-background', '#fff0');
  },
  computed: {
    // rerender() {
    //   this.rerendering();
    // },
    // render() {
    //   this.rendering();
    // },
  },
  watch: {
    data: {
      handler() {
        this.rerendering();
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
