<template>
    <div v-if="state.loading">
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div v-else>
        <div class="container">
            <div class="container__jugadors jugadors">
                <div class="container__jugador jugador" v-for="jugador in game.players">
                    <img :src="jugador.avatar" alt="" class="avatar__jugadors avatar">
                    <span class="nick">{{ jugador.nick }}</span><span class="jugsdor__encertades encertades"> - {{ jugador.encertades }}</span><span class="vida__jugadors vida"> - {{
                        jugador.vida
                    }}/100</span>
                    <div>{{ jugador.poder }}</div>
                </div>
            </div>
            <div class="container__preguntas preguntas">
                <div v-if="game.question.tipus == 1">
                    <div class="container__pregunta pregunta">
                        <div class="pregunta__texto">
                            <span>{{ game.questionIndex }}. </span><span> {{
                                game.question.pregunta }} </span>
                        </div>
                        <div class="respostes container__respostes">
                            <div v-for="(resposta, index) in game.question.respostes" class="resposta">
                                <button @click="answer(index)" class="button__resposta">{{ resposta }}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h1>{{ game.question.pregunta }}</h1>
                    <h2>Pregunta:{{ game.questionIndex }}</h2>
                    <Drag :respostes="game.question.respostes" @comprovar="(index) => answer(index)" />
                </div>
            </div>

            <!-- <vue-countdown ref="timer" :time="getTemps()" :auto-start="false" :interval="100"
                :transform="transformSlotProps" v-slot="{ seconds, milliseconds }" 
                @end="() => {timer.temps = timer.tempsRestant; console.log('startBleed'); startBleed()}"
                @abort="() => { timer.temps = timer.tempsRestant }">
                Temps restant: {{ seconds }}.{{ Math.floor(milliseconds / 100) }} seconds.
            </vue-countdown> -->
            <!--<vue-countdown ref="bleed" :time="2 * 24 * 60 * 60 * 2000" :auto-start="false" :interval="1000"
                    :transform="sendBleed" v-slot="{ seconds }">
                    Bleed: {{ seconds }} seconds.
                </vue-countdown>  -->
            <div class="container__chat">
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
            <div class="container__usuario usuario">
                <div class="container__avatar">
                    <h2 class="nickUsuario">{{ game.ownPlayer.nick }}</h2>
                    <img src="../assets/avatar/avatarMikasa.png" alt="" class="avatar">
                    <div class="barra__vida">
                        <img src="../assets/ilustracio vida/full health.png" alt="" class="vida">{{ game.ownPlayer.vida }}
                    </div>
                </div>
            </div>
            <div class="container__poder poder">
                <button @click="skip">Skip</button>
                <Poder :poder="game.ownPlayer.poder" />
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
//container de la partida
.container {
    display: grid;
    grid-template-areas:
        "jugadors preguntas preguntas"
        "jugadors  preguntas preguntas"
        "chat usuario poder";
    grid-template-columns: 1fr 2fr 0.5fr;
    grid-template-rows: 2fr 0.5fr 1.5fr;
    margin-left: 15vh;
}

//container de los jugador
.container__jugador {
    color: aliceblue;
    background-color: rgb(134, 76, 191);
    border-radius: 6px;
    margin: 1vh;
    padding: 1vh;
    text-align: center;
    font-size: 2vh;
    font-weight: bold;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 12ch;
    width: 50ch;
}

//container de los jugadores
.container__jugadors {
    height: 50vh;
    width: 50vh;
    background-color: rgb(37, 7, 107, 0.8);
    grid-area: jugadors;
    margin-top: 5vh;
    position: absolute;
}

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
    width: 49vh;
    grid-area: chat;
    margin-top: auto;
    height: 33vh;
    top: 1vh;
    border-radius: 6px;
}

//container del usuario
.container__usuario {
    grid-area: usuario;
    background-color: rgb(37, 7, 107, 0.8);
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    width: 73vh;
    height: 20vh;
    border-radius: 60ch;
    position: relative;
    justify-content: center;
    align-items: center;
    bottom: 6vh;
    display: flex;
}

//container del poder
.container__poder {
    grid-area: poder;
    margin-top: auto;
    margin-bottom: auto;
    right: 20ch;
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
}

//container del chat
.enviar {
    height: 3vh;
    width: 3vh;
    display: flex;
    position: relative;
    top: 7px;
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
.container__avatar{
    position: absolute;
    top: 0;
    left: 7ch;
    right: 0;
}
.avatar {
    position: absolute;
    top: 1vw;
    left: 0;
    height: 15vh;
    width: 15vh;
    z-index: 0;
}

.barra__vida {
    position: absolute;
    top: 10vh;
    left: 9vh;
    right: 0;
    z-index: 1;
    margin-left: -3vw;
    margin-right: auto;
}

.vida {
    height: 8vh;
}

.nickUsuario{
    position: absolute;
    top: 3vh;
    left: 0;
    right: 0;
    font-size: 4vh;
    font-weight: bold;
    text-align: center;
    color:#ffdd33;
}

.avatar__jugadors {
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
<script>
import { socket } from '../socket';
import { computed } from 'vue';
import { useAppStore } from "../store/app.js";
import Drag from "./Drag.vue";
import Poder from "./Poder.vue";
export default {
    data() {
        const store = useAppStore();

        return {

            // timer: {
            //     tempsRestant: 0,
            //     temps: 20000,
            //     baseMilliseconds: 1000,
            // },

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
                notFirstQuestion: false,
            },

        };
    },
    components: { Drag, Poder },

    methods: {
        // getTemps() {
        //     console.log(this.timer.temps);
        //     return this.timer.temps!=NaN?this.timer.temps:20000;
        // },
        // startTimer() {
        //     this.$refs.timer.start();
        // },
        // stopTimer() {
        //     this.$refs.timer.abort();
        // },

        startBleed() {
            this.$refs.bleed.start();
        },
        stopBleed() {
            this.$refs.bleed.abort();
        },

        // transformSlotProps(props) {
        //     const formattedProps = {};

        //     Object.entries(props).forEach(([key, value]) => {
        //         formattedProps[key] = value < 10 ? `0${value}` : String(value);
        //     });
        //     this.timer.tempsRestant = parseInt(formattedProps.totalMilliseconds);
        //     return formattedProps;
        // },

        sendBleed(props) {
            const formattedProps2 = {};

            Object.entries(props).forEach(([key, value]) => {
                formattedProps2[key] = value < 10 ? `0${value}` : String(value);
            });
            socket.emit('sagnar vida');
            return formattedProps2;
        },

        skip() {
            socket.emit('skip');
        },

        /**
         * respon a la pregunta
         * @param {int} index index de la resposta
         */
        answer(index) {
            this.game.notFirstQuestion = true;
            // this.stopTimer();
            this.stopBleed();
            // this.timer.temps += 3000;
            socket.emit('answer', this.game.question.idPregunta, index);

        },

        /**
         * Envia un missatge al chat
         */
        enviarMissatge() {
            const store = useAppStore();

            var input = document.getElementById("inputChat");
            socket.emit('enviar missatge', input.value, store.loginInfo.username);
            input.value = "";
        }
    },

    mounted() {
        this.state.loading = false;
        const store = useAppStore();
        // setTimeout(() => {
        //     this.startTimer();
        // }, 1000);
        store.$subscribe((answer) => {
            if (store.getAnswer() == true) {
                console.log("YIPPIEe");


            } else if (store.getAnswer() == false) {
                console.log("   :(");
            }
            store.setAnswer(null);
        });
        store.$subscribe((question) => {
            if (question.idPregunta != this.game.question.idPregunta && this.game.notFirstQuestion) {
                // this.timer.temps = question.temps * this.timer.baseMilliseconds;
                // this.startTimer();
            }
        });


    },

}
</script>

