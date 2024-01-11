<template>
    <iconsHead></iconsHead>
    <div class="page">
        <div class="configuration-board">
            <div class="configuration-title-background">
                <h1 class="title"> Configura la teva partida</h1>
            </div>
            <div class="configuration-name-room">
                <input class="input-name" v-model="nom" name="nom" placeholder="Nom sala">
            </div>
            <div class="configuration-buttons">
                <!-- <div class="buttons-background b-left">
                    <select class="buttons-size-style" v-model="categoria">
                        <option :value="nothing" disabled selected>Categoria</option>
                        <option v-for="item in ['Volums', 'Litres', 'Kg']" :value="item">{{ item }}</option>
                    </select>
                </div>
                <div class="buttons-background b-right">
                    <select class="buttons-size-style" v-model="dificultat">
                        <option :value="nothing" disabled selected>Dificultat</option>
                        <option v-for="item in ['Fàcil', 'Mitjà', 'Difícil']" :value="item">{{ item }}</option>
                    </select>
                </div> -->
                <div class="buttons-background b-left">
                    <select class="buttons-size-style" v-model="maxJugadors">
                        <option :value="0" disabled selected>nº Jugadors</option>
                        <option v-for="n in 39" :value="n+1">{{ n+1 }}</option>
                    </select>
                </div>
                <!--  <div class="buttons-background b-right">
                    <select class="buttons-size-style" >
                        <option  disabled selected>Limit de partida</option>
                        <option v-for="item in ['Sense límit', '20 Preguntes', '10 Preguntes', '5 minuts', '10 minuts']" :value="item">{{ item }}</option>
                    </select>
                </div>
                 -->
            </div>
        </div>
        <button class="button-crearPartida-background button-crearPartida" @click="crear">Crear partida</button>
    </div>
</template>

<style scoped>
.page {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.configuration-board {
    /* fons del container */
    border-radius: 12px;
    background-color: rgba(70, 23, 143, 0.7);
    padding: 2vh;
    box-shadow: inset 4px 4px 4px 0px rgba(0, 0, 0, 0.2), inset 4px 4px 4px 0px rgba(0, 0, 0, 0.2);

    /* mida del container */
    width: 70vw;
    height: 75vh;

    /* aliniació del container */
    display: grid;
    grid-template-areas:
        "title title title"
        ". nameRoom ."
        "buttons buttons buttons";
    align-items: center;
    justify-content: center;
}

.configuration-title-background {
    grid-area: title;
    width: 65vw;
    height: 10vh;
    border-radius: 50px;
    background-color: rgb(255, 165, 2);
    border: 4px solid rgb(226, 65, 4);

}

.title {
    color: #e24104;
    text-align: center;
    font-size: 3em;
}

.configuration-name-room {
    /* estils fons */
    border-radius: 60px;
    background-color: rgba(51, 204, 204, 1);
    border: 3px solid rgba(10, 163, 163, 1);
    box-shadow: inset 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
    /* mida */
    width: 15vw;
    height: 10vh;
    /* aliniació */
    grid-area: nameRoom;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.input-name {
    /* mida */
    margin-top: 1.2vh;
    width: 13vw;
    /* estils text */
    color: rgba(235, 33, 60, 1);
    font-family: 'Battle Beasts';
    font-size: 2vw;
    /* aliniació */
    text-align: center;
}

.input-name::placeholder {
    color: rgba(235, 33, 60, 1);
    font-family: 'Battle Beasts';
    font-size: 2vw;
}

.configuration-buttons {
    /* mida */
    width: 55vw;
    height: 35vh;
    /* aliniació */
    grid-area: buttons;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin-left: auto;
}

.b-left {
    border-radius: 60px 0px 60px 0px;
}

.b-right {
    border-radius: 0px 60px 0px 60px;
}

.buttons-background {
    /* mida */
    width: 18vw;
    height: 8vh;
    /* aliniació */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    /* estils fons */
    background-color: rgba(51, 204, 204, 1);
    border: 3px solid rgba(10, 163, 163, 1);
    box-shadow: inset 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
}

.buttons-size-style {
    /* mida */
    width: 14vw;
    height: 6vh;
    /* aliniació */
    margin-top: 0.7vh;
    /* estils text */
    color: rgba(235, 33, 60, 1);
    font-family: 'Battle Beasts';
    font-size: 2vw;
}

.buttons-size-style>option {
    /* estils text */
    color: rgba(235, 33, 60, 1);
    font-family: 'Battle Beasts';
    font-size: 1vw;
}

.button-crearPartida-background {
    /* fons del container */
    border-radius: 40px;
    background-color: rgba(102, 191, 57, 1);
    border: 4px solid rgba(16, 107, 3, 1);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
    /* mida del container */
    width: 40vw;
    height: 10vh;
    /* aliniació del container */
    margin-top: -6.2vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button-crearPartida {
    color: rgba(70, 23, 143, 1);
    font-family: "Battle Beasts";
    font-size: 5vw;
}

.input-name:focus,
.buttons-size-style:focus {
    outline: none;
}
</style>

<script>
import { socket } from '../socket';
import { computed } from 'vue';
import { useAppStore } from "../store/app.js";
import store from '@/store';

import iconsHead from './iconesHead.vue';

export default {
    components: {
        iconsHead
    },
    data() {
        const store = useAppStore();
        return {
            nom: '',
            maxJugadors: 0,

        };
    },
    methods: {

        crear() {
            const store = useAppStore();
            socket.emit('create game', this.nom, this.maxJugadors, store.loginInfo.username);
            this.$router.push('/lobby');
        }
    },

    mounted() {
    },
    created() {
        const store = useAppStore();
        if (!store.loginInfo.verificat) {
            this.$router.push('/');
        }
    },

}
</script>
