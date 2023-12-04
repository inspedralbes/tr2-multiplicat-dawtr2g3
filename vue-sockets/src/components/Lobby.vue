<template>
    <div>
        <div class="jugadors">
            <h2>Jugadors</h2>
            <div class="jugador" v-for="jugador in players">
                {{ jugador.nick }}
            </div>
        </div>
        <div class="chat">
                <div class="missatge" v-for="missatge in chat">
                    <span>{{ missatge.nick  }}</span>:<span>  {{ missatge.msg  }}</span>
                </div>
                <input type="text" id="inputChat">
                <button @click="enviarMissatge()">Enviar</button>
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
            chat: computed(() => store.chat),
        };
    },
    methods: {
        start() {
            console.log("empezar");
            socket.emit('start');
        },
        enviarMissatge() {
            const store = useAppStore();

            var input = document.getElementById("inputChat");
            socket.emit('enviar missatge', input.value,store.loginInfo.username);
            input.value = "";
        }
    },

    mounted() {
    },
    created() {

    },

}
</script>
  