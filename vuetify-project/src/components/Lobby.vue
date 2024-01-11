<template>
    <icons-head></icons-head>
    <div class="page-lobby">
        <div class="board-background">
            <div class="board-llista-jugadors">
                <h1 class="title-jugadors">Jugadors</h1>
                <div class="info-sala">
                    <span class="sala-name">{{ this.nomPartida }}</span>
                    <p class="sala-numJugadors">{{ this.players.length }}/{{ this.jugadorsMax }} Jugadors</p>
                </div>
                <div class="container-llista-jugadors">
                    <ul class="llista-jugadors">
                        <li class="jugador" v-for="jugador in players">
                            <span class="name-jugador">{{ jugador.nick }}</span>
                            <!--  <button class="btn-eliminar">Eliminar</button> -->
                        </li>
                    </ul>
                </div>

            </div>

            <button v-if="$router.options.history.state.back == '/crearPartida'" class="btn-comencarPartida"
                @click="start">Iniciar partida</button>
            <h2 v-else class="subtitle-wait">Esperant Jugadors...</h2>
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
    /* alineació del container */
    display: flex;
    flex-direction: column;
    align-items: center;
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
    text-shadow: -1px -1px rgb(255, 255, 255);
}

.info-sala {
    border-radius: 28px;
    background-color: rgba(232, 222, 248, 0.7);
    margin: auto;
    width: 27vw;
    height: 7vh;

    text-align: center;
    text-shadow: 0.1em 0.1em 0.4em rgb(0, 0, 0);
    color: rgba(102, 191, 57, 1);
}

.sala-name {
    font-size: 1.5vw;
    display: inline-block;
    margin-right: 3vw;
    margin-top: 1vh;
}

.sala-numJugadors {
    font-size: 1vw;
    display: inline-block;
    margin-left: 3vw;
    margin-top: 1vh;
}

.container-llista-jugadors {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 27vw;
    height: 40vh;
    overflow-y: scroll;
    margin: auto;
    margin-top: 3vh;
}

.container-llista-jugadors::-webkit-scrollbar {
    width: 0vw;
}

.llista-jugadors {
    list-style: none;
}

.jugador {
    width: 20vw;
    height: 7vh;
    margin-bottom: 1vh;
    display: flex;
    align-items: center;
    border: 1px 0px 0px 0px solid rgb(255, 255, 255);
}

.name-jugador {
    /* estils */
    color: rgb(255, 255, 255);
    font-size: 1.5vw;
    /* alineació */
    text-align: left;
    margin-left: 1.2vw;
    margin-right: 1.8vw;
}

.btn-eliminar {
    /* estils */
    color: rgba(255, 172, 0, 1);
    font-size: 1vw;
    /* alineació */
    display: inline;
    border-radius: 50px;
    background-color: rgba(198, 9, 41, 1);
    padding-left: 0.5vw;
    padding-right: 0.5vw;
    margin-left: 2vw;
}

.jugador:hover {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 60px;
}

.btn-comencarPartida {
    color: rgba(70, 23, 143, 1);
    font-family: 'Battle Beasts';
    font-size: 2vw;
    background-color: rgba(102, 191, 57, 1);
    border: 4px solid rgba(16, 107, 3, 1);
    border-radius: 50px;
    padding-left: 0.5vw;
    padding-right: 0.5vw;
    margin-top: 1vh;
}

.subtitle-wait {
    color: rgba(255, 51, 85, 1);
    font-family: 'Battle Beasts';
    font-size: 4vw;
    margin-top: 5vh;
}
</style>
<script>
// import { useAppStore } from "../stores/app.js";
import { socket } from '../socket';
import { computed } from 'vue';
import { useAppStore } from "../store/app.js";

import iconsHead from './iconesHead.vue';
import store from '@/store';
import router from '@/router';

export default {
    components: {
        iconsHead
    },
    data() {
        const store = useAppStore();
        return {
            players: computed(() => store.players),
            chat: computed(() => store.chat),
            nomPartida: computed(() => store.nomPartida),
            jugadorsMax: computed(() => store.maxJugadors),
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
        console.log(this.$router.options.history.state.back)
        const store = useAppStore();
        if (this.$router.options.history.state.back == '/partida' || this.$router.options.history.state.back == '/' ) {
            socket.emit('tornar a lobby');
            console.log('adios')
        }
        if(store.enPartida){
            socket.emit('tornar a lobby');
            router.push('/');
            store.enPartida = false;
            console.log('adios')

        }
    },

}
</script>
