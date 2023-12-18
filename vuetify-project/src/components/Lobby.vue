<template>
    <div class="page-lobby">
        <div class="board-background">
            <div class="board-llista-jugadors">
                <h1 class="title-jugadors">Jugadors</h1>
                <div class="info-sala">
                    <span class="sala-name">Sala 344</span>
                    <p class="sala-jugadors">13/30 Jugadors</p>
                </div>
                <!-- <div class="jugador" v-for="jugador in players">
                    {{ jugador.nick }}
                </div> -->
            </div>
            <!-- <div class="chat">
                    <div class="missatge" v-for="missatge in chat">
                        <span>{{ missatge.nick  }}</span>:<span>  {{ missatge.msg  }}</span>
                    </div>
                    <input type="text" id="inputChat">
                    <button @click="enviarMissatge()">Enviar</button>
            </div> -->
            <button v-if="$router.options.history.state.back == '/crearPartida'" @click="start">Començar partida</button>
        </div>
    </div>
</template>
<style scoped>
.page-lobby {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.board-background {
    /* fons del container */
    padding: 2vh;
    background-color: rgba(70, 23, 143, 0.3);
    box-shadow: inset 4px 4px 4px 0px rgba(0, 0, 0, 0.2), inset 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
    /* mida del container */
    width: 40vw;
    height: 70vh;
}

.board-llista-jugadors {
    width: 33vw;
    height: 66vh;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50px;
    margin: auto;
}

.title-jugadors {
    color: rgba(102, 191, 57, 1);
    font-family: 'Battle Beasts';
    text-align: center;
    font-size: 5vw;
}

.info-sala {
    border-radius: 28px;
    background-color: rgba(232, 222, 248, 0.7);
    margin: auto;
    width: 30vw;
    height: 7vh;
}
.sala-name {
    color: rgba(102, 191, 57, 1);
    display: inline-block;
}

.sala-jugadors {
    color: rgba(102, 191, 57, 1);
    display: inline-block;
}
</style>
<script>
// import { useAppStore } from "../stores/app.js";
import { socket } from '../socket';
import { computed } from 'vue';
import { useAppStore } from "../store/app.js";

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
            socket.emit('enviar missatge', input.value, store.loginInfo.username);
            input.value = "";
        }
    },

    mounted() {
    },
    created() {

    },

}
</script>
