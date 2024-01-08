<template>
    <div v-if="state.loading">
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div v-else v-bind:class="{ 'mort': game.mort }">
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
                    <button :disabled="disabled" @click="skip"><img src="../assets/icono/skip.png" alt=""
                            class="imagen__skip"></button>
                </div>
                <div class="container__poder poder">
                    <Poder :poder="game.ownPlayer.poder" @utilitzarPoder="utilitzarPoder()" />
                </div>
                <p class="nomPoder">{{ game.ownPlayer.poder }}</p>

            </div>
        </div>
        <div v-else class="duelo">
                <div class="container__preguntas preguntas">
                    <Drag :respostes="game.question.respostes" :pregunta="game.question.pregunta"
                        @comprovar="(index) => answer(index)" />
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
                            <v-avatar v-else-if="avatar == 6" class="avatar"
                                image="../assets/avatar/avatarHombrePeloBlanco.png" size="100"></v-avatar>
                            <v-avatar v-else-if="avatar == 7" class="avatar" image="../assets/avatar/avatarLevie.png"
                                size="100"></v-avatar>
                            <v-avatar v-else-if="avatar == 8" class="avatar" image="../assets/avatar/avatarMikasa.png"
                                size="100"></v-avatar>
                            <v-avatar v-else-if="avatar == 9" class="avatar"
                                image="../assets/avatar/avatarMujerPeloRojo.png" size="100"></v-avatar>
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
                                <img v-else-if="this.game.ownPlayer.vida > 50"
                                    src="/src/assets/ilustracio-vida/75_health.png" alt="" class="imagen-vida">
                                <img v-else-if="this.game.ownPlayer.vida > 25"
                                    src="/src/assets/ilustracio-vida/50_health.png" alt="" class="imagen-vida">
                                <img v-else-if="this.game.ownPlayer.vida > 0"
                                    src="/src/assets/ilustracio-vida/25_health.png" alt="" class="imagen-vida">



                                <h3 class="numero__vida">{{ game.ownPlayer.vida }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container__info info">
                    <div class="container__usuario usuario">
                        <div class="container__avatar">
                            <h2 class="nickUsuario">{{ game.oponent.nick }}</h2>
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
                            <v-avatar v-else-if="avatar == 6" class="avatar"
                                image="../assets/avatar/avatarHombrePeloBlanco.png" size="100"></v-avatar>
                            <v-avatar v-else-if="avatar == 7" class="avatar" image="../assets/avatar/avatarLevie.png"
                                size="100"></v-avatar>
                            <v-avatar v-else-if="avatar == 8" class="avatar" image="../assets/avatar/avatarMikasa.png"
                                size="100"></v-avatar>
                            <v-avatar v-else-if="avatar == 9" class="avatar"
                                image="../assets/avatar/avatarMujerPeloRojo.png" size="100"></v-avatar>
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
                                <img v-if="this.game.oponent.vida > 75" src="/src/assets/ilustracio-vida/full-health.png"
                                    alt="" class="imagen-vida">
                                <img v-else-if="this.game.oponent.vida > 50" src="/src/assets/ilustracio-vida/75_health.png"
                                    alt="" class="imagen-vida">
                                <img v-else-if="this.game.oponent.vida > 25" src="/src/assets/ilustracio-vida/50_health.png"
                                    alt="" class="imagen-vida">
                                <img v-else-if="this.game.oponent.vida > 0" src="/src/assets/ilustracio-vida/25_health.png"
                                    alt="" class="imagen-vida">



                                <h3 class="numero__vida">{{ game.oponent.vida }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    <v-row justify="center">
        <v-dialog v-model="game.dialog" scrollable width="auto">
            <v-card>
                <v-card-title>Escull objectiu</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                    <div v-for="jugador in game.players">
                        <v-btn v-if="jugador.idSocket != game.ownPlayer.idSocket" color="primary"
                            @click="escollirObjectiu(jugador.idSocket)">{{ jugador.nick }}</v-btn>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1" variant="text" @click="game.dialog = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<style lang="scss" scoped>

.mort{
    filter: grayscale(100%);
}

.nomPoder {
    top: 0;
    left: 0;
    right: 0;
    font-size: 2vh;
    text-align: center;
    color: #ffdd33;
    display: none;
}

.poder:hover + .nomPoder {
  display: block;
}


//container de la partida
.container {
    display: grid;
    grid-template-areas:
        "jugadors preguntas"
        "chat info";
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 3fr 1.5fr;
    margin-left: 15vh;
    width: 85vw;
}


//container de los jugadores
.container__jugadors {
    height: 50vh;
    width: 50vh;
    background-color: rgb(37, 7, 107, 0.8);
    grid-area: jugadors;
    border-radius: 6px;
    position: relative;
    top: 5vh;
}

.item-scroll {
    overflow-y: scroll;
    position: relative;
    height: 47vh;
    top: 1vh;
}

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

.item-scroll::-webkit-scrollbar {
    width: 1vh;
}

.item-scroll::-webkit-scrollbar-thumb {
    background-color: rgb(134, 76, 191);
    border-radius: 5px;
}

//color del scroll y forma

//container de las preguntas
.container__preguntas {
    position: relative;
    border-radius: 2vh;
    background-color: aliceblue;
    text-align: center;
    grid-area: preguntas;
    width: 95vh;
    margin-left: auto;
    margin-right: auto;
    height: 60vh;
    top: 5vh;
}

//container de las pregunta
.container__pregunta {
    position: relative;
    background-color: rgb(134, 76, 191);
    text-align: center;
    height: 7vw;
    width: 56vh;
    border-radius: 60ch 60ch;
    top: 2vw;
}

.pregunta {
    margin-left: auto;
    margin-right: auto;
    align-items: center;
}


//container del chat
.container__chat {
    background-color: rgb(37, 7, 107, 0.8);
    position: relative;
    color: aliceblue;
    width: 50vh;
    grid-area: chat;
    height: 33vh;
    border-radius: 6px;
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

//container del poder
.container__poder {
    position: relative;
    display: flex;
    justify-content: center;
    right: 5vh;
}

//container de las respuestas
.container__respostes {
    display: grid;
    position: relative;
    top: 33vh;
    grid-template-columns: 1fr 1fr;
    right: 6vh;
}

//boton de las respuestas
.button__resposta {
    background-color: aqua;
    padding: 1vh;
    width: 30vh;
    margin: 2vh;
    border-radius: 6px;
    font-size: 2em;
}

//container del chat
.enviar {
    height: 3vh;
}

.button__chat {
    display: flex;
    position: relative;
    left: 0.5rem;
}

//impunt del chat
#inputChat {
    background-color: aliceblue;
    width: 44vh;
    border-radius: 5px;
}

//los mensajes del chat
.missatge {
    position: relative;
    color: aliceblue;
    width: 40vh;
    left: 1vh;
}

//container del mensaje
.container__missatge {
    overflow-y: scroll;
    position: relative;
    height: 27vh;
    bottom: 4vh;
}

//hancho del scroll
.container__missatge::-webkit-scrollbar {
    width: 1vh;
}

//color del scroll y forma
.container__missatge::-webkit-scrollbar-thumb {
    background-color: rgb(134, 76, 191);
    border-radius: 5px;
}

//container del boton del chat
.container__imputButtom {
    display: flex;
    position: absolute;
    bottom: 1vh;
    left: 1vh;
}

//container del chat
.chat {
    position: relative;
    top: 6vh;
}

.pregunta__texto {
    position: absolute;
    font-size: 2vh;
    font-weight: bold;
    top: 5vh;
    left: 0;
    right: 0;
}

.container__avatar {
    position: absolute;
    top: 0;
    left: 3ch;
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

.barra__vida {
    position: absolute;
    top: 11vh;
    left: 6vh;
    right: 0;
    z-index: 1;
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

.nickUsuario {
    position: absolute;
    top: 3vh;
    left: 0;
    right: 3vh;
    font-size: 4vh;
    font-weight: bold;
    text-align: center;
    color: #ffdd33;
}

.imagen__skip {
    height: 11vh;
    width: 6vw;
}

.container__skip {
    position: relative;
    display: flex;
    justify-content: center;
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

            divActivo: 'duelo',
            state: {

                loading: true,
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
                duelo: false,
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

