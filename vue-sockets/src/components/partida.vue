<template>
    <div>
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div>
        <div>
            <h2>{{ game.questionIndex }}</h2>
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

              
                questionIndex:computed(() => store.questionIndex),
                players:computed(() => store.players),
                question:computed(() => store.question)

            },

        };
    },
    methods: {
        sumar() {
            const store = useAppStore();
            store.aumentar();
            console.log(store.getQuestionIndex());
        },

        respondre(index) {
            if (index == 0) {
                if (this.partida.actual == this.partida.data.length - 1) {
                    this.$router.push('/final');
                } else {
                    this.partida.actual++;
                }
            } else {
                this.partida.actual = 0;
            }
        }
    },

    mounted() {
        this.loading = false;
        const store = useAppStore();
        console.log(store.getQuestionIndex());
    },
    setup() {
        const store = useAppStore();

        return {
            partida: {
                actual: computed(() => store.questionIndex),
            },
        }

    }
}
</script>

<style lang="scss" scoped></style>