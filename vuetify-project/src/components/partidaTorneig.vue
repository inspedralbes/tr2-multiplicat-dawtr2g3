<template>
               
            <div class="container__preguntas preguntas">
                <Drag :respostes="game.question.respostes" :pregunta="game.question.pregunta"
                    @comprovar="(index) => answer(index)" />
            </div>
            
</template>

<style lang="scss" scoped>

.duelo {
    background-image: url("../assets/backgrounds/fondo-duelo.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    display: grid;
    grid-template-areas:
        "preguntaDuelo"
        "usuarioDuelo";
}
.container__preguntaDuelo {
    display: grid;
    grid-area: preguntaDuelo;
    background-color: white;
    position: relative;
    color: aliceblue;
    width: 50vw;
    height: 60vh;
    border-radius: 6px;
    margin-left: auto;
    margin-right: auto;
}
.container__dueloUsuarios {
    grid-area: usuarioDuelo;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    position: relative;
}
.usuarioEnemigo{
    right: 10vh;
}
.usuarioDuelo{
    left: 10vh;
}
.cantidadPreguntas{
    color: black;
    font-size: 2vh;
    margin: 1vh;
}
//container de la partida
.animacioVida {
    background-color: #ffdd33;
    animation: tilt-shaking 0.5s;
}

@keyframes tilt-shaking {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(5deg);
    }

    50% {
        transform: rotate(0eg);
    }

    75% {
        transform: rotate(-5deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
//container del usuario
.container__usuario {
    background-color: rgb(37, 7, 107, 0.8);
    width: 62vh;
    height: 20vh;
    border-radius: 60ch;
    position: relative;
    display: flex;
}

.container__avatar {
    position: absolute;
    top: 0;
    left: 3ch;
    right: 0;
}

.container__avatarUsuario {
    position: absolute;
    top: 0;
    left: 52ch;
    right: 0;
}
.avatar {
    position: absolute;
    top: 0;
    left: 0;
    height: 19vh;
    width: 19vh;
    z-index: 0;
}
.avatarUsuario {
    position: absolute;
    top: 1ch;
    left: 0;
    height: 18vh;
    width: 18vh;
    z-index: 0;
}
.barra__vida {
    position: absolute;
    top: 11vh;
    left: 6vh;
    right: 0;
    z-index: 1;
}
.barra__vidaUsuario {
    position: absolute;
    top: 11vh;
    left: -33vh;
    right: 0;
    z-index: 1;
}

.barra__vidaUsuario img{
    transform: scaleX(-1);
}
.numero__vida {
    position: absolute;
    top: 0;
    left: 34vh;
    right: 0;
    font-size: 4vh;
    text-align: center;
    color: #ffdd33;
}

.imagen-vida {
    position: absolute;
    height: 7vh;

}

.vida {
    height: 8vh;
}

.container__info {
    grid-area: info;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    position: relative;

}

.nickEnemigo {
    position: absolute;
    top: 3vh;
    left: 0;
    right: 3vh;
    font-size: 4vh;
    font-weight: bold;
    text-align: center;
    color: #ffdd33;
}

.nickUsuario {
    position: absolute;
    top: 3vh;
    left: -35vh;
    right: 0;
    font-size: 4vh;
    font-weight: bold;
    text-align: center;
    color: #ffdd33;
}
</style>

<script>
import { socket } from '../socket';
import { computed } from 'vue';
import { useAppStore } from "../store/app.js";
import Drag from "./Drag.vue";
import Poder from "./Poder.vue";
import { toHandlers } from 'vue';
import JugadorPartida from './JugadorPartida.vue';
import store from '@/store';
export default {
    data() {
        const store = useAppStore();

        return {
            state: {
                loading: false,
                error: false,
            },
            game: {
                chat: computed(() => store.chat),
                questionIndex: computed(() => store.questionIndex),
                players: computed(() => store.players),
                ownPlayer: computed(() => store.ownPlayer),
                question: computed(() => store.question),
                answer: computed(() => store.answer),
                temps: computed(() => store.timer),
                mort: computed(() => store.dead),
                avatar: computed(() => store.avatar),
                oponent: computed(() => store.ownPlayer.oponent),

                notFirstQuestion: false,
                dialog: false,
            },
            timerInterval: null,
            disabled: false,
            animacioVida: computed(() => store.animacioVida),
        };
    },
    components: { Drag, Poder, JugadorPartida },

    methods: {

        skip() {
            socket.emit('skip');
            this.disabled = true;
            setTimeout(() => {
                this.disabled = false;
            }, 1000);
        },

        utilitzarPoder() {
            if (this.game.ownPlayer.poder.length > 0) {
                let objectiu = socket.id;

                if (this.game.mort) {
                    this.game.dialog = true;
                } else {
                    if (this.game.ownPlayer.poder == "menysTemps" || this.game.ownPlayer.poder == "duelo") {
                        this.game.dialog = true;
                    } else {
                        socket.emit("use power", this.game.ownPlayer.poder, objectiu);
                    }
                }

            }
        },

        escollirObjectiu(id) {
            socket.emit("use power", this.game.ownPlayer.poder, id);
            this.game.dialog = false;
        },

        /**
         * Para el temps
         */
        pararTemps() {
            store.stopTImer();

        },

        /**
         * respon a la pregunta
         * @param {int} index index de la resposta
         */
        answer(index) {
            this.game.notFirstQuestion = true;
            socket.emit('answer torneig', this.game.question.idPregunta, index);

        },

        /**
         * Envia un missatge al chat
         */
        enviarMissatge() {
            const store = useAppStore();

            var input = document.getElementById("inputChat");
            socket.emit('send message', input.value, store.loginInfo.username);
            input.value = "";
        },
        getHP() {

            if (this.game.ownPlayer.vida > 75) {
                return "../assets/ilustracio-vida/full-health.png";
            } else if (this.game.ownPlayer.vida > 50) {
                return "../assets/ilustracio-vida/75_health.png";
            } else if (this.game.ownPlayer.vida > 25) {
                return "../assets/ilustracio-vida/50_health.png";
            } else if (this.game.ownPlayer.vida > 0) {
                return "../assets/ilustracio-vida/25_health.png";
            } else {
                return "../assets/ilustracio-vida/0_health.png";
            }
        }
    },

    mounted() {
        this.state.loading = false;

    },

}
</script>

