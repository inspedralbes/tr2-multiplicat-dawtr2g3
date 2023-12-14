<template>
    <div class="configuration-page">
        <h1 class="title-configurarPartida">Configura la teva partida</h1>
        <div class="formPartida">
            <label for="nom">Nom de la partida</label>
            <input type="text" v-model="nom" name="nom">
            <label for="maxJugadors">Màxim de jugadors</label>
            <div class="slidecontainer">
                <input type="range" min="2" max="40" value="20" class="slider" name="maxJugadors" v-model="maxJugadors" id="myRange">
            </div>
        </div>
        <button @click="crear">Crear partida</button>
    </div>
</template>

<style scoped>
    .configuration-page {
        display: flex;
        flex-direction: column;
        align-items: center;

        /* fons del container */
        background-color: #46178f;
        opacity: 0.7;
        border-radius: 5%;
    }

    .title-configurarPartida {
        font-size: 5rem !important;
        font-weight: 300;
        line-height: 6rem;
        text-transform: none !important;
        color: #ffc00a;
        margin-top: 10%;
        margin-bottom: 5%;

        background-color: #e24104;
        border-radius: 50%;
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
