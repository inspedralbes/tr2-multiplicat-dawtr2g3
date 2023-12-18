<template>
    <div class="container__jugador jugador">
        <span class="nick">{{ jugador.nick }}</span>
        <div class="container__vidaJugadors">
            <span class="vida__jugadors">  {{
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 50ch;
    border-radius: 60ch;
    margin: 1vh;
    padding: 1vh;
    text-align: center;
    font-size: 2vh;
    font-weight: bold;
}



.nick {
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
}

.vida__jugadors {
    font-size: 1.5em;
    font-weight: bold;
    color: #ffa502;
    align-self: center;
}

</style>