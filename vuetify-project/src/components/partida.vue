<template>
    <div>
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div>
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

            <vue-countdown ref="foo" :time="game.question.temps * baseMilliseconds" :auto-start="false" :interval="1000" :transform="transformSlotProps" v-slot="{ seconds }"
                @end="() => console.log('hola')"
                @abort="() => {game.question.temps = tempsRestant.totalMilliseconds/1000}">
                Time Remaining: {{ seconds }} seconds.
            </vue-countdown>

            <button @click="startTimer">Start timer</button>

            <button @click="stopTimer">Stop timer</button>


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

export default {
    data() {
        const store = useAppStore();
        
        return {
            tempsRestant: null,
            baseMilliseconds: 1000,

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
            },

        };
    },
    components: { Drag, Poder },

    methods: {
        startTimer() {
            this.$refs.foo.start();
        },
        stopTimer() {
            this.$refs.foo.abort();
        },

        transformSlotProps(props) {
            this.tempsRestant = {};

            Object.entries(props).forEach(([key, value]) => {
                this.tempsRestant[key] = value < 10 ? `0${value}` : String(value);
            });
            return this.tempsRestant;
        },

        skip() {
            socket.emit('skip');
        },

        /**
         * respon a la pregunta
         * @param {int} index index de la resposta
         */
        answer(index) {
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
        this.loading = false;
        const store = useAppStore();
        store.$subscribe((answer) => {
            if (answer == true) {
                console.log("YIPPIE");

            } else if (answer == false) {
                console.log(":(")
            }
            store.setAnswer(null);
        })
    },

}
</script>

<style lang="scss" scoped></style>