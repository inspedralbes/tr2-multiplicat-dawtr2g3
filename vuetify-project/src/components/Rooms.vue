<template>
    <icons-head></icons-head>
    <div class="page-buscarPrtida">
        <div class="configuration-board-background">
            <div class="board-llista-salas">
                <h1 class="llista-salas-title">Escull Una Sala per Jugar...</h1>
                <div class="container-llista-salas">


                    <ul class="llista-salas" v-for="partida in partides">
                        <li class="sala" @click="marcar(partida.id)" :id="partida.id">
                            <span class="sala-name">{{ partida.nom }}</span>
                            <p class="sala-jugadors">{{ partida.jugadors.length }} / {{ partida.maxJugadors }} Jugadors</p>
                        </li>
                    </ul>
                </div>
                <button class="button-jugarPartida-background button-jugarPartida" v-if="this.idPartida != null"
                    @click="join()">Jugar</button>

            </div>
        </div>
    </div>
</template>
<style scoped>
.page-buscarPrtida {
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
    width: 40vw;
    height: 70vh;
}

.board-llista-salas {
    width: 33vw;
    height: 66vh;
    background-color: rgba(255, 255, 255, 0.7);
    margin: auto;
}

.llista-salas-title {
    /* alineació del text */
    margin-top: 1vh;
    text-align: center;
    /* estils */
    color: rgba(255, 166, 2, 1);
    font-size: 2.5vw;
}

.container-llista-salas {
    grid-area: llista-salas;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25vw;
    height: 52vh;
    overflow-y: scroll;
    scroll-behavior: smooth;
    margin: auto;
    margin-top: 3vh;
}

.container-llista-salas::-webkit-scrollbar {
    width: 0vw;
}

.llista-salas {
    list-style: none;
}

.sala {
    width: 20vw;
    height: 7vh;
    margin-bottom: 1vh;
    display: flex;
    align-items: center;
}

.sala-name {
    /* estils */
    color: rgb(12, 12, 12);
    font-size: 1.5vw;
    /* alineació */
    text-align: left;
    margin-left: 0.7vw;
    margin-right: 2vw;
}

.sala-categoria {
    /* estils */
    color: rgb(99, 99, 99);
    font-size: 1vw;
    /* alineació */
    text-align: center;
    display: inline;
    margin-right: 0.7vw;
}

.sala-jugadors {
    /* estils */
    color: rgb(99, 99, 99);
    font-size: 1vw;
    /* alineació */
    text-align: right;
    display: inline;
}

.sala:hover {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 60px;
    cursor: pointer;
}

.button-jugarPartida {
    color: rgba(70, 23, 143, 1);
    font-family: "Battle Beasts";
    font-size: 3vw;
}

.button-jugarPartida-background {
    border-radius: 40px;
    background-color: rgba(102, 191, 57, 1);
    border: 4px solid rgba(16, 107, 3, 1);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
    width: 18vw;
    height: 7vh;
    margin: auto;
    margin-top: -1.2vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
}

.marcat {
    background-color: rgba(255, 255, 255, 0.7);

}
</style>
<script>
// import { useAppStore } from "../stores/app.js";
import { socket } from '../socket';
import { computed } from 'vue';
import { useAppStore } from "../store/app.js";
import store from '@/store';
import Toastify from 'toastify-js';

import iconsHead from './iconesHead.vue';

export default {
    components: {
        iconsHead
    },
    data() {
        const store = useAppStore();
        return {
            players: computed(() => store.players),
            chat: computed(() => store.chat),
            partides: computed(() => store.partides),
            idPartida: null,
        };
    },
    methods: {
        marcar(id) {
            if (this.idPartida != null) {

                document.getElementById(this.idPartida).classList.remove("marcat");
            }
            this.idPartida = id;
            document.getElementById(id).classList.add("marcat");
        },
        join() {
            const store = useAppStore();
            socket.emit('join', this.idPartida, store.loginInfo.username);
        },
        toast() {
            Toastify({

                text: "Partida plena!",
                backgroundColor: '#FC1A1A',
                duration: 3000

            }).showToast();
        }
    },

    mounted() {


        socket.on('max jugadors', () => {
            console.log("max jugadors");
            this.toast();
        });
    },
    created() {
        console.log(this.$router.options.history.state.back)

        if (this.$router.options.history.state.back == '/lobby' || this.$router.options.history.state.back == '/' ) {
            socket.emit('tornar a lobby');
            console.log('adios')
        }
    },

}
</script>