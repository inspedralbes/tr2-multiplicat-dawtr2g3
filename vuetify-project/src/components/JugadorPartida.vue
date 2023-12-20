<template>
    <div class="container__jugador jugador">
        <span class="nick">{{ jugador.nick }}</span>
        <span class="vida__jugadors">{{ jugador.vida }}/100</span>
        <div class="container__vida-jugadors">
            <img v-if="jugador.vida > 75" src="/src/assets/ilustracio-vida/full-health.png" alt=""
                class="imagen__vida">
            <img v-else-if="jugador.vida > 50" src="/src/assets/ilustracio-vida/75_health.png" alt=""
                class="imagen__vida">
            <img v-else-if="jugador.vida > 25" src="/src/assets/ilustracio-vida/50_health.png" alt=""
                class="imagen__vida">
            <img v-else-if="jugador.vida > 0" src="/src/assets/ilustracio-vida/25_health.png" alt=""
                class="imagen__vida">

        </div>
        <div class="poder">{{ jugador.poder }}</div>
    </div>
</template>

<script>
export default {
    props: {
        jugador: {
            type: Object,
            required: true
        }
    },
    methods: {
        getHP() {
            if (this.jugador.vida > 75) {
                return "/src/assets/ilustracio-vida/full-health.png";
            } else if (this.jugador.vida > 50) {
                return "/src/assets/ilustracio-vida/75_health.png";
            } else if (this.jugador.vida > 25) {
                return "/src/assets/ilustracio-vida/50_health.png";
            } else if (this.jugador.vida > 0) {
                return "/src/assets/ilustracio-vida/25_health.png";
            } else {
                return "/src/assets/ilustracio-vida/0_health.png";
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container__jugador {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
        "nom nom poder"
        "vidaImg vidaImg vidaText";
    padding-left: 5px;
    padding-right: 5px;
}



.nick {
    grid-area: nom;
    font-size: 1.5em;
    font-weight: bold;
    color: #ffa502;
    align-self: center;
}

.jugador {
    color: aliceblue;
    background-color: rgb(134, 76, 191);
    border-radius: 60ch;
    margin: 1vh;
    padding: 1vh;
    text-align: center;
    font-size: 2vh;
    font-weight: bold;
    height: 12vh;
}

.vida__jugadors {
    grid-area: vidaText;
    font-size: 1.5em;
    font-weight: bold;
    color: #ffa502;
    align-self: center;
}

.imagen__vida {
    position: relative;
    height: 6vh;
    right: 6vh;
}

.container__vida-jugadors {
    grid-area: vidaImg;
}

.poder {
    grid-area: poder;
    font-size: 1.5em;
    font-weight: bold;
    color: #ffa502;
    align-self: center;
}</style>