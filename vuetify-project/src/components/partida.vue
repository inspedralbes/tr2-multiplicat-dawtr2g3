<template>
    <div v-if="state.loading">
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div v-else>
        <div>
            <div class="jugadors">
                <div class="jugador" v-for="jugador in game.players">
                    <span>{{ jugador.nick }}</span><span> - {{ jugador.encertades }}</span><span> - {{ jugador.vida
                    }}/100</span>
                    <div>{{ jugador.poder }}</div>
                </div>
            </div>
            <div v-if="game.question.tipus == 1">
                <h1>{{ game.question.pregunta }}</h1>
                <h2>Pregunta:{{ game.questionIndex }}</h2>
                <div class="respostes">
                    <div class="resposta" v-for="(resposta, index) in game.question.respostes">

                        <button @click="answer(index)">{{ resposta }}</button>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1>{{ game.question.pregunta }}</h1>
                <h2>Pregunta:{{ game.questionIndex }}</h2>
                <Drag :respostes="game.question.respostes" @comprovar="(index) => answer(index)" />
            </div>

            <h1> {{ game.temps }}</h1>

            <!--  -->
            <div class="chat">
                <div class="missatge" v-for="missatge in game.chat">
                    <span>{{ missatge.nick }}</span>:<span> {{ missatge.msg }}</span>
                </div>
                <input type="text" id="inputChat">
                <button @click="enviarMissatge()">Enviar</button>
            </div>
        </div>
        <button @click="skip">Skip</button>
        <Poder :poder="game.ownPlayer.poder" />
        <p>Vida: {{ game.ownPlayer.vida }}</p>
    </div>
</template>

<script>
import { socket } from '../socket';
import { computed } from 'vue';
import { useAppStore } from "../store/app.js";
import Drag from "./Drag.vue";
import Poder from "./Poder.vue";
import { toHandlers } from 'vue';

export default {
    data() {
        const store = useAppStore();

        return {


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
                temps: 0,
            },
            timerInterval: null,

        };
    },
    components: { Drag, Poder },

    methods: {

        startTimer() {
            this.timerInterval = setInterval(() => {
                if (this.game.temps <= 0) {
                    socket.emit('sagnar vida');
                } else {
                    this.game.temps--;
                }
            }, 1000);
        },
        stopTimer() {
            clearInterval(this.timerInterval);
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
            this.stopTimer();
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
        this.game.temps = store.timer;
        setTimeout(() => {
            this.startTimer();
        }, 1000);

        store.$subscribe((answer) => {
            if (store.getAnswer() == true) {
                console.log("YIPPIEe");

            } else if (store.getAnswer() == false) {
                console.log("   :(");
            }
            store.setAnswer(null);
        });
        store.$subscribe((canvi) => {
            if (store.canvi == true) {
                store.canvi = false;

                console.log("AAAAAAA");
                this.stopTimer();
                this.game.temps = store.timer;
                setTimeout(() => {
                    this.startTimer();
                }, 1000);
            }
        });


    },

}
</script>

<style lang="scss" scoped></style>