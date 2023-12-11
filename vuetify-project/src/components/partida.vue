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
                    <span>{{ jugador.nick }}</span><span> {{ jugador.encertades }}</span>
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

            <div class="chat">
                <div class="missatge" v-for="missatge in game.chat">
                    <span>{{ missatge.nick }}</span>:<span> {{ missatge.msg }}</span>
                </div>
                <input type="text" id="inputChat">
                <button @click="enviarMissatge()">Enviar</button>
            </div>
        </div>
        <button @click="sumar">Sumar</button>

    </div>
</template>

<script>
import { socket } from '../socket';
import { computed } from 'vue';
import { useAppStore } from "../store/app.js";
import Drag from "./Drag.vue";

export default {
    data() {
        const store = useAppStore();

        return {
            constants: {
                // API_URL: "https://api.github.com",
                numRespostesTest: 4,
            },
            state: {
                loading: true,
                error: false,
            },
            game: {

                chat: computed(() => store.chat),
                questionIndex: computed(() => store.questionIndex),
                players: computed(() => store.players),
                question: computed(() => store.question),
                answer: computed(() => store.answer),
            },

        };
    },
    components: { Drag },
    methods: {
        sumar() {
            console.log(this.game.players);
        },

        answer(index) {
            socket.emit('answer', this.game.question.idPregunta, index);
        },
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
        console.log(store.getQuestionIndex());
        store.$subscribe((answer) => {
            console.log(this.game.question.respostes);
            if (store.getAnswer() == true) {
                console.log("YIPPIE");
                socket.emit("send");
            } else if (store.getAnswer() == false) {
                console.log(":(")
            }
            console.log(store.getAnswer());
            store.setAnswer(null);
        })
    },

}
</script>

<style lang="scss" scoped></style>