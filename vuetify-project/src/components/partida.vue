<template>
    <div v-if="state.loading">
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div v-else v-bind:class="{ 'mort': game.mort }">
        <div v-if="!game.duelo.enDuelo" class="container">
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
            <div v-if="!game.mort" class="container__reloj">
                <img src="../assets/altres ilustracions/relog-de-arena.gif" alt="" class="imagen__reloj">
                <h6 class="texto__tiempo">{{ game.temps }}</h6>
            </div>
            <div v-if="divActivo != 'partida'" class="container__chat">
                <div class="chat">
                    <div class="container__missatge">
                        <div class="missatge" v-for="missatge in game.chat">
                            <span class="missatgeUsuari">{{ missatge.nick }}</span>: <span> {{ missatge.msg }}</span>
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
                    <h2 class="nickUsuario">{{ game.ownPlayer.nick }}</h2>
                    <div class="container__avatar">
                        
                            <img v-if="game.avatar == 1" class="avatar" src="../assets/avatar/avatarVaiolet.png">
                            <img v-else-if="game.avatar == 2" class="avatar" src="../assets/avatar/avatarCerdo.png">
                            <img v-else-if="game.avatar == 3" class="avatar" src="../assets/avatar/avatarEric.png">
                            <img v-else-if="game.avatar == 4" class="avatar" src="../assets/avatar/avatarGatoSuperman.png" >
                            <img v-else-if="game.avatar == 5" class="avatar" src="../assets/avatar/avatarHamsterTrex.png">
                            <img v-else-if="game.avatar == 6" class="avatar" src="../assets/avatar/avatarHombrePeloBlanco.png">
                            <img v-else-if="game.avatar == 7" class="avatar" src="../assets/avatar/avatarLevie.png">
                            <img v-else-if="game.avatar == 8" class="avatar" src="../assets/avatar/avatarMikasa.png">
                            <img v-else-if="game.avatar == 9" class="avatar" src="../assets/avatar/avatarMujerPeloRojo.png">
                            <img v-else-if="game.avatar == 10" class="avatar" src="../assets/avatar/avatarPerroBatman.png">
                            <img v-else-if="game.avatar == 11" class="avatar" src="../assets/avatar/avatarPerroDJ.png">
                            <img v-else-if="game.avatar == 12" class="avatar" src="../assets/avatar/avatarPower.png">
                            <img v-else-if="game.avatar == 13" class="avatar" src="../assets/avatar/avatarZorro.png">
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
                            <h3 v-if="!game.mort" class="numero__vida">{{ game.ownPlayer.vida }}</h3>
                        </div>
                    </div>
                </div>
                <div class="container__skip">
                    <div class="skip" :class="{ 'animate-arrow': isAnimating }">
                        <button :disabled="disabled" @click="skip"><img src="../assets/icono/skip.png" alt=""  class="imagen__skip"></button>
                    </div>
                    <div class="hoverSkip">
                        <p>
                            Saltar pregunta: el primer no et treu vida. Després començaràs a perdre vida, MOLTA.
                        </p>
                    </div>
                </div>
                
                <div class="container__poder">
                    <div class="poder">
                        <Poder :poder="game.ownPlayer.poder" @utilitzarPoder="utilitzarPoder()" />
                    </div>
                    <div class="nomPoder">
                        <p v-if="game.ownPlayer.poder.length != 0">{{ game.ownPlayer.poder }}</p>
                        <p v-else>Poders: 0</p>
                    </div>
                </div>             
            </div>
        </div>
        <div v-else class="duelo">
            <div class="container__preguntaDuelo preguntas">
                <Drag :respostes="game.question.respostes" :pregunta="game.question.pregunta"
                    @comprovar="(index) => answer(index)" />
            </div>
           <div class="container__dueloUsuarios">
                <div class="container__usuarioDuelo usuario usuarioDuelo">
                    <h2 class="nickUsuarioDuelo">{{ game.ownPlayer.nick }}</h2>
                        <div class="container__avatar">
                            <img src="../assets/avatar/avatarDerecha.png" alt="" class="avatar">
                            <div class="barra__vidaUsuario" v-bind:class="{ 'animacioVida': animacioVida }">
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
                    <div class="container__usuarioEnemigo usuario">
                        <h2 class="nickEnemigo">{{ game.oponent.nick }}</h2>
                        <div class="container__avatarEnemigo">
                            <img src="../assets/avatar/avatarIzquierda.png" alt="" class="avatar">
                            <div class="barra__vidaEnemigo" v-bind:class="{ 'animacioVida': animacioVida }">
                                <img v-if="this.game.oponent.vida > 75" src="/src/assets/ilustracio-vida/full-health.png" alt=""
                                    class="imagen-vida">
                                <img v-else-if="this.game.oponent.vida > 50" src="/src/assets/ilustracio-vida/75_health.png"
                                    alt="" class="imagen-vida">
                                <img v-else-if="this.game.oponent.vida > 25" src="/src/assets/ilustracio-vida/50_health.png"
                                    alt="" class="imagen-vida">
                                <img v-else-if="this.game.oponent.vida > 0" src="/src/assets/ilustracio-vida/25_health.png"
                                    alt="" class="imagen-vida">



                                <h3 class="numero__vidaEnemigo">{{ game.oponent.vida }}</h3>
                            </div>
                        </div>
                    </div> 
            </div>
        </div> 
    </div>
    <v-row justify="center">
    <v-dialog v-model="game.dialog" scrollable width="30vw">
        <v-card>
            <v-card-title class="headline blue-grey white--text" style="font-size: 2rem; text-align: center; background-color: #a2d1f2;">Escull objectiu</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 25vh; padding: 20px; background-color: #c2a5df;">
                <v-card v-for="jugador in game.players" class="mb-4" style="background-color: #b2df9b;">
                    <div v-if="game.ownPlayer.nick != jugador.nick && !jugador.duelo.enDuelo && jugador.vida > 0 ">
                        <v-card-text>
                            <div style="font-size: 2rem; text-align: center; text-transform: uppercase; color: #0542b9;">{{ jugador.nick }}</div>
                        </v-card-text>
                        <v-row align="center" justify="center" style="padding: 2vh;">
                            <v-btn style="font-size: 1rem;" v-if="jugador.idSocket != game.ownPlayer.idSocket  && !jugador.duelo.enDuelo && jugador.vida > 0" @click="escollirObjectiu(jugador.idSocket)">
                                <v-icon left>mdi-account-arrow-right</v-icon>
                                Escollir
                            </v-btn>
                        </v-row>
                    </div>
                </v-card>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions style="background-color: #a2d1f2;">
                <v-btn  style="background-color: #e21b3c; color: white;" variant="text" @click="cerrarModal">
                    <v-icon left>mdi-close</v-icon>
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-row>
</template>

<style lang="scss" scoped>


.duelo {
    background-image: url("../assets/backgrounds/background-dol-joc.png");
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
.container__avatarEnemigo{
    position: absolute;
    top: 0;
    right: 0;
}

.container__avatarEnemigo img{
    transform: translateX(260%) scale(1.2) translateY(20%);
}

.barra__vidaEnemigo {
    position: relative;
    top: -3.5vh;
    left: -2vh;
    z-index: 1;
}

.barra__vidaEnemigo img{
    transform: scaleX(-1);
}
.container__dueloUsuarios {
    grid-area: usuarioDuelo;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    position: relative;
}
.container__preguntaDuelo {
    display: grid;
    grid-area: preguntaDuelo;
    background-color: white;
    position: relative;
    color: aliceblue;
    width: 60vw;
    height: 70vh;
    border-radius: 6px;
    margin-left: auto;
    margin-right: auto;
}

.usuarioDuelo{
    right: 10vh;
}

.usuarioEnemigo{
    left: 10vh;
}
.missatgeUsuari{
    font-size: 25px;
}
.nickUsuarioDuelo {
    position: absolute;
    top: 3vh;
    left: 0;
    right: 0;
    font-size: 4vh;
    font-weight: bold;
    text-align: center;
    color: #ffdd33;
} 

.nickEnemigo {
    position: relative;
    top: 3vh;
    left: 0;
    right: 0;
    font-size: 4vh;
    font-weight: bold;
    text-align: center;
    color: #ffdd33;
}

.numero__vidaEnemigo {
    position:relative;
    left: -24vh;
    right: 0;
    font-size: 4vh;
    text-align: center;
    color: #ffdd33;
}
@keyframes animateArrow {
    0% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(30%);
    }

    100% {
        transform: translateX(0);
    }
}

.animate-arrow {
    animation: animateArrow 0.5s ease-in-out;
}

.mort {
    filter: grayscale(100%);
}

.nomPoder {
    background-color: white;
    border: 1px solid black;
    padding: 1%;
    width: 7vw;
    height: 4vh;
    position: absolute;
    top: -9.5vh;
    text-align: center;
    color: #000000;
    display: none;
}

.poder:hover+.nomPoder {
    display: block;
}

.hoverSkip {
    background-color: white;
    border: 1px solid black;
    padding: 1%;
    width: 12vw;
    height: 10vh;
    position: absolute;
    top: -6.5vh;
    text-align: center;
    color: #000000;
    display: none;
}

.skip:hover+.hoverSkip {
    display: block;
}

//container de la partida
.container {
    display: grid;
    grid-template-areas:
        "jugadors preguntas reloj"
        "chat info info";
    grid-template-columns: 2fr 3fr 0.1fr;
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
    left: 4vh;
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

.container__usuarioDuelo {
    background-color: rgb(37, 7, 107, 0.8);
    width: 62vh;
    height: 20vh;
    border-radius: 60ch;
    position: relative;
    display: flex;
}

.container__usuarioEnemigo {
    background-color: rgb(37, 7, 107, 0.8);
    height: 20vh;
    border-radius: 60ch;
    position: relative;
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
    display: flex;
    position: absolute;
    top: 2.6ch;
    left: 3ch;
    right: 0;
}

.avatar {
    width: 25%;
}

.barra__vida {
    position: absolute;
    top: 7vh;
    left: 3vh;
    right: 0;
    z-index: 1;
}
.barra__vidaUsuario {
    position: absolute;
    top: 8vh;
    left: 3vh;
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
    left: 5vh;

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

.nickUsuarioDuelo {
    position: absolute;
    top: 3vh;
    left: 0;
    right: 0;
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

.container__reloj {
    position: relative;
    display: flex;
    justify-content: center;
}

.imagen__reloj {
    height: 25vh;
    margin: 0;
}

.texto__tiempo {
    position: absolute;
    top: 18vh;
    left: 0;
    right: 0;
    font-size: 4vh;
    font-weight: bold;
    text-align: center;
    color: white;
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
            isAnimating: false,
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
                duelo: computed(() => store.duelo),
                oponent: computed(() => this.game.players.find(player => player.idSocket == store.duelo.oponent.id)),

                notFirstQuestion: false,
                dialog: computed(() => store.dialog),
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
            this.animateButton();
        }, animateButton() {

            this.isAnimating = true;
            setTimeout(() => {
                this.isAnimating = false;
            }, 1000); // same duration as the animation
        }, utilitzarPoder() {
            const store = useAppStore();

            if (this.game.ownPlayer.poder.length > 0) {
                let objectiu = socket.id;
                if (this.game.mort) {
                    store.dialog = true;
                } else {
                    if (this.game.ownPlayer.poder == "menysTemps" || this.game.ownPlayer.poder == "duelo") {
                        store.dialog = true;
                    } else {
                        socket.emit("use power", this.game.ownPlayer.poder, objectiu);
                    }
                }
            }
        },

        escollirObjectiu(id) {
            socket.emit("use power", this.game.ownPlayer.poder, id);
            const store = useAppStore();
            store.dialog = false;
        },
        cerrarModal(){
            const store = useAppStore();
            store.dialog = false;
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
            console.log("hola");
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

