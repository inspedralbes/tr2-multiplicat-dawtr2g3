<template>
    <div class="centrar">
        <bracket :rounds="rounds">
            <template #player="{ player }">
                {{ player.name }}
            </template>
        </bracket>
    </div>
</template>

<script>
import Bracket from "vue-tournament-bracket";

export default {
    components: {
        Bracket
    },
    data() {
        return {
            rounds: [
                //Semi finals
                {
                    games: [
                        {

                            player1: { id: "1", name: "Loris", winner: false },
                            player2: { id: "4", name: "Sara", winner: true },
                        },
                        {

                            player1: { id: "5", name: "Julie", winner: false },
                            player2: { id: "8", name: "Arnau", winner: true },
                        }
                    ]
                },
                {
                    games: [
                        {

                            player1: { id: "1", name: "Loris", winner: false },
                            player2: { id: "5", name: "Julie", winner: true },
                        }
                    ]
                },
                //Final
                {
                    games: [
                        {

                            player1: { id: "4", name: "Sara",  },
                            player2: { id: "8", name: "Arnau",  },
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

.centrar{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.centrar * {
    font-size: larger;
}

</style>