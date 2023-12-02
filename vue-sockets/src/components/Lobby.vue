<template>
    <div>
        <div class="jugadors">
            <h2>Jugadors</h2>
            <div class="jugador" v-for="jugador in players">
                {{ jugador.nick }}
            </div>
        </div>
        <Button label="Començar partida" @click="start"></Button>
    </div>
</template>
<script>
// import { useAppStore } from "../stores/app.js";
import { socket } from '../socket';
import { computed } from 'vue';
import { useAppStore } from "../stores/app.js";

export default {
    data() {
        const store = useAppStore();
        return {
            players: computed(() => store.players),

        };
    },
    methods: {
        start() {
            console.log("empezar");
            socket.emit('start');
        }
    },

    mounted() {
    },
    created() {

    },

}
</script>
  