<template>
    <div class="page-buscarPrtida">
        <div class="configuration-board-background">
            <div class="distribucio-board">
                <div class="board-llista-salas">
                    <h1 class="llista-salas-title">Escull una sala per jugar</h1>
                    <div class="partida" v-for="partida in partides">
                        <h2 class="partida__nom">{{ partida.nom }}</h2>
                        <p class="partida__jugadors">{{ partida.jugadors.length }} / {{ partida.maxJugadors }}</p>
                        <button @click="join(partida.id)">Entrar</button>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>
<style scoped>
    .page-buscarPrtida{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .configuration-board-background {
        /* fons del container */
        background-color: rgba(70, 23, 143, 0.7);
        padding: 2vh;
        box-shadow: inset 4px 4px 4px 0px rgba(0, 0, 0, 0.2), inset 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
        /* mida del container */
        width: 70vw;
        height: 70vh;
    }

    .distribucio-board{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .board-llista-salas{
        width: 30vw;
        height: 66vh;
        background-color: rgba(255, 255, 255, 0.7);    
    }

    .llista-salas-title{
        color: rgba(255, 166, 2, 1);
        font-family: 'Share Tech';
        font-style: normal;
        font-size: 4vw;
        font-weight: 400;
        line-height: 1.2;
        letter-spacing: 0.01px;
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
            players: computed(() => store.players),
            chat: computed(() => store.chat),
            partides: computed(() => store.partides),
        };
    },
    methods: {
        join(id) {
            const store = useAppStore();
            socket.emit('join', id, store.loginInfo.username);
            this.$router.push('/lobby');
        }
    },

    mounted() {
    },
    created() {

    },

}
</script>