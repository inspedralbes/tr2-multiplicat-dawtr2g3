<template>
    <div class="page">
        <div class="configuration-board">
            <div class="configuration-title-background">
                <h1 class="title"> Configura la teva partida</h1>
            </div>
            <div class="configuration-name-room">
                <v-label for="nom">Nom de la partida</v-label>
                <v-text-field type="text" v-model="nom" name="nom"></v-text-field>
            </div>
            <div class="configuration-buttons">
                <v-label for="maxJugadors">Màxim de jugadors</v-label>
                <div class="slidecontainer">
                    <v-text-field type="range" min="2" max="40" value="20" class="slider" name="maxJugadors" v-model="maxJugadors" id="myRange"></v-text-field>
                </div>
            </div>
            <v-btn @click="crear">Crear partida</v-btn>
        </div>
    </div>
</template>

<style scoped>
    .page{
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .configuration-board {
        /* fons del container */
        border-radius: 12px;
        background-color: rgba(70, 23, 143, 0.7);
        gap: 8px;
        padding: 16px;
        flex-wrap: nowrap;
        box-shadow: inset 4px 4px 4px 0px rgba(0, 0, 0, 0.2), inset 4px 4px 4px 0px rgba(0, 0, 0, 0.2);

        /* mida del container */
        width: 70%;
        height: 60%;

        /* aliniació del container */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }
    .configuration-title-background {
        width: 65vw;
        height: 10vh;
        border-radius: 50px;
        background-color: rgb(226, 65, 4);
    }
    .title {
        font-size: 5rem !important;
        font-weight: 300;
        line-height: 6rem;
        text-transform: none !important;
        color: #ffc00a;
        margin-left: 2%;
    }
    .configuration-buttons {
        background-color: gray;
        width: 80%;
        height: 60%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }
    .configuration-name-room {
        color: #eb213c;
        background-color: gray;
        width: 80%;
        height: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }
</style>

<script>
// import { useAppStore } from "../stores/app.js";
import { socket } from '../socket';
import { computed } from 'vue';
import { useAppStore } from "../store/app.js";
import store from '@/store';

export default {
    data() {
        const store = useAppStore();
        return {
            nom: '',
            maxJugadors: 0,

        };
    },
    methods: {
        
        crear(){
            const store = useAppStore();
            socket.emit('crearPartida',this.nom,this.maxJugadors,store.loginInfo.username);
            this.$router.push('/lobby');
        }
    },

    mounted() {
    },
    created() {

    },

}
</script>
