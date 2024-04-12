<template>
    <div class="container__jugador jugador">
        <span class="nick">{{ jugador.nick }}  <img :style="{display: 'inline', height:'180px', position:'absolute',right:'14px', transform:'translateY(-110px)' }" v-if="jugador.encertades >= 2 && jugador.encertades < 4"  src="/src/assets/rachas/racha5.gif" alt=""> <img :style="{display: 'inline', height:'50px', position:'absolute',right:'43px', transform:'translateY(-20px)' }" v-if="jugador.encertades >= 4 && jugador.encertades < 5"  src="/src/assets/rachas/racha10.gif" alt=""> <img :style="{display: 'inline', height:'80px', position:'absolute',right:'40px', transform:'translateY(-40px)', zIndex: '0' }" v-if="jugador.encertades >= 5"  src="/src/assets/rachas/racha15.gif" alt=""></span>
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
        <div class="racha" :style="[jugador.encertades>4?{color:'red'}:{color:'blue'}]">{{ jugador.encertades<1?'':jugador.encertades }}</div>
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

.racha {
    z-index: '1';
    right: 72px;
    grid-area: poder;
    font-size: 1.5em;
    font-weight: bold;
    color: #ffa502;
    position: absolute;
}</style>