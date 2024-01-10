<template>
    <div v-if="state.loading">
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div v-else>
        <div v-if="!game.duelo" class="container">
            <div class="container__jugadors jugadors">
                <div class="item-scroll">
                    <div class="container__jugador jugador" v-for="jugador in game.players">
                        <JugadorPartida :jugador="jugador" />
                    </div>
                </div>
            </div>
            <div class="container__preguntas preguntas">
                <Drag :respostes="game.question.respostes" :pregunta="game.question.pregunta"
                    @comprovar="(index) => answer(index)" />
            </div>
            <div v-if="divActivo != 'partida'" class="container__chat">
                <div class="chat">
                    <div class="container__missatge">
                        <div class="missatge" v-for="missatge in game.chat">
                            <span>{{ missatge.nick }}</span>:<span> {{ missatge.msg }}</span>
                        </div>
                    </div>
                    <div class="container__imputButtom">
                        <input type="text" id="inputChat">
                        <button @click="enviarMissatge()" class="button__chat"><img src="../assets/icono/enviar.png" alt=""
                                class="enviar"></button>
                    </div>
                </div>
            </div>
            <div class="container__info info">
                <div class="container__usuario usuario">
                    <div class="container__avatar">
                        <h2 class="nickUsuario">{{ game.ownPlayer.nick }}</h2>
                        <v-avatar v-if="avatar == 1" class="avatar" image="../assets/avatar/avatarVaiolet.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 2" class="avatar" image="../assets/avatar/avatarCerdo.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 3" class="avatar" image="../assets/avatar/avatarEric.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 4" class="avatar" image="../assets/avatar/avatarGatoSuperman.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 5" class="avatar" image="../assets/avatar/avatarHamsterTrex.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 6" class="avatar" image="../assets/avatar/avatarHombrePeloBlanco.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 7" class="avatar" image="../assets/avatar/avatarLevie.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 8" class="avatar" image="../assets/avatar/avatarMikasa.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 9" class="avatar" image="../assets/avatar/avatarMujerPeloRojo.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 10" class="avatar" image="../assets/avatar/avatarPerroBatman.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 11" class="avatar" image="../assets/avatar/avatarPerroDJ.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 12" class="avatar" image="../assets/avatar/avatarPower.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 13" class="avatar" image="../assets/avatar/avatarZorro.png"
                            size="100"></v-avatar>
                        <!-- <img src="../assets/avatar/avatarMikasa.png" alt="" class="avatar"> -->
                        <div class="barra__vida" v-bind:class="{ 'animacioVida': animacioVida }">
                            <img v-if="this.game.ownPlayer.vida > 75" src="/src/assets/ilustracio-vida/full-health.png"
                                alt="" class="imagen-vida">
                            <img v-else-if="this.game.ownPlayer.vida > 50" src="/src/assets/ilustracio-vida/75_health.png"
                                alt="" class="imagen-vida">
                            <img v-else-if="this.game.ownPlayer.vida > 25" src="/src/assets/ilustracio-vida/50_health.png"
                                alt="" class="imagen-vida">
                            <img v-else-if="this.game.ownPlayer.vida > 0" src="/src/assets/ilustracio-vida/25_health.png"
                                alt="" class="imagen-vida">
                            <h3 class="numero__vida">{{ game.ownPlayer.vida }}</h3>
                        </div>
                    </div>
                </div>
                <div class="container__skip">
                    <button :disabled="disabled" @click="skip"><img src="../assets/icono/skip.png" alt="" class="imagen__skip"></button>
                </div>
                <div class="container__poder poder">
                    <Poder :poder="game.ownPlayer.poder" @utilitzarPoder="utilitzarPoder()" />
                </div>
            </div>
        </div>
        <div v-else class="duelo">
            <div class="container__preguntaDuelo">
                <p class="cantidadPreguntas"><span>{{ game.questionIndex + 1 }}</span> /3 PREGUNTES
                    
                </p>
            </div>
            <div class="container__dueloUsuarios">
                <div class="container__usuario usuario usuarioEnemigo">
                    <div class="container__avatar">
                    <img src="../assets/avatar/avatarMikasa.png" height="" class="avatar">
                    <h2 class="nickEnemigo">Mikasa</h2>
                    <div class="barra__vida">
                        <img src="../assets/ilustracio-vida/full-health.png" alt="" class="imagen-vida">
                    </div>
                        <h2 class="nickUsuario">{{ game.ownPlayer.nick }}</h2>
                        <v-avatar v-if="avatar == 1" class="avatar" image="../assets/avatar/avatarVaiolet.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 2" class="avatar" image="../assets/avatar/avatarCerdo.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 3" class="avatar" image="../assets/avatar/avatarEric.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 4" class="avatar" image="../assets/avatar/avatarGatoSuperman.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 5" class="avatar" image="../assets/avatar/avatarHamsterTrex.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 6" class="avatar" image="../assets/avatar/avatarHombrePeloBlanco.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 7" class="avatar" image="../assets/avatar/avatarLevie.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 8" class="avatar" image="../assets/avatar/avatarMikasa.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 9" class="avatar" image="../assets/avatar/avatarMujerPeloRojo.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 10" class="avatar" image="../assets/avatar/avatarPerroBatman.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 11" class="avatar" image="../assets/avatar/avatarPerroDJ.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 12" class="avatar" image="../assets/avatar/avatarPower.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 13" class="avatar" image="../assets/avatar/avatarZorro.png"
                            size="100"></v-avatar>
                        <!-- <img src="../assets/avatar/avatarMikasa.png" alt="" class="avatar"> -->
                        <div class="barra__vida" v-bind:class="{ 'animacioVida': animacioVida }">
                            <img v-if="this.game.ownPlayer.vida > 75" src="/src/assets/ilustracio-vida/full-health.png"
                                alt="" class="imagen-vida">
                            <img v-else-if="this.game.ownPlayer.vida > 50" src="/src/assets/ilustracio-vida/75_health.png"
                                alt="" class="imagen-vida">
                            <img v-else-if="this.game.ownPlayer.vida > 25" src="/src/assets/ilustracio-vida/50_health.png"
                                alt="" class="imagen-vida">
                            <img v-else-if="this.game.ownPlayer.vida > 0" src="/src/assets/ilustracio-vida/25_health.png"
                                alt="" class="imagen-vida">
                            <h3 class="numero__vida">{{ game.ownPlayer.vida }}</h3>
                        </div>
                    </div>
                </div>
                <div class="container__usuario usuario usuarioDuelo">
                    <div class="container__avatarUsuario">
                        <img src="../assets/avatar/avatarVaiolet.png" height="" class="avatarUsuario">
                        <h2 class="nickUsuario">Orlito</h2>
                        <div class="barra__vidaUsuario">
                            <img src="../assets/ilustracio-vida/full-health.png" alt="" class="imagen-vida">
                        </div>
                        <h2 class="nickUsuario">{{ game.ownPlayer.nick }}</h2>
                        <v-avatar v-if="avatar == 1" class="avatar" image="../assets/avatar/avatarVaiolet.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 2" class="avatar" image="../assets/avatar/avatarCerdo.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 3" class="avatar" image="../assets/avatar/avatarEric.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 4" class="avatar" image="../assets/avatar/avatarGatoSuperman.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 5" class="avatar" image="../assets/avatar/avatarHamsterTrex.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 6" class="avatar" image="../assets/avatar/avatarHombrePeloBlanco.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 7" class="avatar" image="../assets/avatar/avatarLevie.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 8" class="avatar" image="../assets/avatar/avatarMikasa.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 9" class="avatar" image="../assets/avatar/avatarMujerPeloRojo.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 10" class="avatar" image="../assets/avatar/avatarPerroBatman.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 11" class="avatar" image="../assets/avatar/avatarPerroDJ.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 12" class="avatar" image="../assets/avatar/avatarPower.png"
                            size="100"></v-avatar>
                        <v-avatar v-else-if="avatar == 13" class="avatar" image="../assets/avatar/avatarZorro.png"
                            size="100"></v-avatar>
                        <!-- <img src="../assets/avatar/avatarMikasa.png" alt="" class="avatar"> -->
                        <div class="barra__vida" v-bind:class="{ 'animacioVida': animacioVida }">
                            <img v-if="this.game.ownPlayer.vida > 75" src="/src/assets/ilustracio-vida/full-health.png"
                                alt="" class="imagen-vida">
                            <img v-else-if="this.game.ownPlayer.vida > 50" src="/src/assets/ilustracio-vida/75_health.png"
                                alt="" class="imagen-vida">
                            <img v-else-if="this.game.ownPlayer.vida > 25" src="/src/assets/ilustracio-vida/50_health.png"
                                alt="" class="imagen-vida">
                            <img v-else-if="this.game.ownPlayer.vida > 0" src="/src/assets/ilustracio-vida/25_health.png"
                                alt="" class="imagen-vida">
                            <h3 class="numero__vida">{{ game.ownPlayer.vida }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                oponent: computed(() => players.find(player => player.idSocket == store.oponent)),

                notFirstQuestion: false,
                dialog: false,
                duelo: true,
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
            socket.emit('answer', this.game.question.idPregunta, index);

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

