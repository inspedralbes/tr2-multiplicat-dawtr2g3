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
                    <span>{{ jugador.nick  }}</span><span>  {{ jugador.encertades  }}</span>
                </div>
            </div>
            <h1>{{ game.question.pregunta }}</h1>
            <h2>Pregunta:{{ game.questionIndex }}</h2>
            <div class="respostes">
                <div class="resposta" v-for="(resposta, index) in game.question.respostes">
                    
                    <button @click="answer(index)">{{ resposta }}</button>
                </div>
            </div>
        </div>
        <button @click="sumar">Sumar</button>

    </div>
</template>

<script>
import { socket } from '../socket';
import { computed } from 'vue';
import { useAppStore } from "../stores/app.js";
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


                questionIndex: computed(() => store.questionIndex),
                players: computed(() => store.players),
                question: computed(() => store.question),
                answer: computed(() => store.answer),
            },

        };
    },
    methods: {
        sumar() {
            console.log(this.game.players);
        },

        answer(index) {
            socket.emit('answer', this.game.question.idPregunta, index);
        }
    },

    mounted() {
        this.loading = false;
        const store = useAppStore();
        console.log(store.getQuestionIndex());
        store.$subscribe((answer) => {
            console.log(this.game.question.respostes);
            if (store.getAnswer() == true){
                console.log("YIPPIE");
                socket.emit("send");
            }else if (store.getAnswer() == false){
                console.log(":(")
            }
            console.log(store.getAnswer());
            store.setAnswer(null);
        })
    },

}
</script>

<style lang="scss" scoped></style>