<template>
  <div id="updateCurrentBracket"></div>

  <!-- This div will be used as the root for the library. It must be **perfectly** empty to prevent a FOUC. -->
  <!-- <div id="bracketsViewerExample" ref="bracketsViewerExample" class="brackets-viewer"></div> -->

  <!-- <div id="createNewBracket"></div>
    <script
    type="text/javascript"
    src="../dist/stage-form-creator.min.js"
  ></script>
  <div ref="ELEMENT_ID"></div> -->

  <div id="example" ref="example" class="brackets-viewer"></div>
</template>

<script>

export default {
  // components: {
  //     Bracket
  // },
  data() {
    return {
      data: {},
    };
  },
  async mounted() {
    this.data = await fetch("./src/assets/json/db.json").then(() => {
      window.bracketsViewer.setParticipantImages(
        this.data.participant.map((participant) => ({
          participantId: participant.id,
          imageUrl: "https://github.githubassets.com/pinned-octocat.svg",
        }))
      );
    });

    this.$refs.example.innerHTML = "";

    await window.bracketsViewer.render(
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
          console.log(info);

          if (info.fractionOfFinal === 1 / 2) {
            if (info.groupType === "single-bracket") {
              // Single elimination
              return "Semi Finals";
            } else {
              // Double elimination
              return `${t(`abbreviations.${info.groupType}`)} Semi Finals`;
            }
          }
        },
        onMatchClick: (match) => console.log("A match was clicked", match),
        selector: "#example",
        participantOriginPlacement: "before",
        separatedChildCountLabel: true,
        showSlotsOrigin: true,
        showLowerBracketSlotsOrigin: true,
        highlightParticipantOnHover: true,
      }
    );

    // this.$refs.bracketsViewerExample.style.setProperty('--primary-background', '#fff0');
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
