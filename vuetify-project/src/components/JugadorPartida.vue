<template>
    <div class="container__jugador jugador">
        <img :src="jugador.avatar" alt="" class="avatar__jugadors avatar">
        <span class="nick">{{ jugador.nick }}</span>      
        <div class="container__vidaJugadors">
            <span class="vida__jugadors"> - {{
                jugador.vida
            }}/100 <img :src="getHP()" alt=""></span>
        </div>
        <div>{{ jugador.poder }}</div>
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
    height: 12ch;
    width: 50ch;
    grid-template-areas:
        "avatar  nick nick"
        "avatar vida__jugadors";
    grid-template-columns: 0.7fr 2fr 0.2fr;
    grid-template-rows: 1fr 1fr;
}

.avatar__jugadors {
    grid-area: avatar;
    height: 100%;
    width: 100%;
}

.nick {
    grid-area: nick;
    font-size: 1.5em;
    font-weight: bold;
    color: #ffa502;
    align-self: center;
}

.jugador {
    color: aliceblue;
    background-color: rgb(134, 76, 191);
    border-radius: 6px;
    margin: 1vh;
    padding: 1vh;
    text-align: center;
    font-size: 2vh;
    font-weight: bold;
    justify-content: space-around;
    align-items: center;
}
 
.avatar__jugadors {
    grid-area: avatar__jugadors;
    position: relative;
    top: 0;
    left: 0;
    height: 10vh;
    width: 10vh;
    z-index: 0;
    border-radius: 50%;
    background-color: rgb(37, 7, 107, 0.8);
}
</style>