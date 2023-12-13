<template>
    <div>
        <button @click="$router.push('/crearPartida')">Crear partida</button>
        <div class="llistaPartides">
            <h1>Partides</h1>
            <div class="partida" v-for="partida in partides">
                <h2 class="partida__nom">{{ partida.nom }}</h2>
                <p class="partida__jugadors">{{ partida.jugadors.length }} / {{ partida.maxJugadors }}</p>
                <button @click="join(partida.id)">Entrar</button>
            </div>
        </div>

    </div>
</template>
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
  