<template>
    <div class="page">
        <div class="configuration-board">
            <div class="configuration-title-background">
                <h1 class="title"> Configura la teva partida</h1>
            </div>
            <div class="configuration-name-room">
                <v-text-field class="input-name" variant="underlined" label="Nom sala" v-model="nom" name="nom"></v-text-field>
            </div>
            <div class="configuration-buttons">
                <!-- <div class="button-categoria buttons b-left">
                    <v-select class="buttons-size" label="Categoria" variant="underlined" v-model="categoria" :items="['Volums', 'Litres', 'Kg']"></v-select>
                </div>
                <div class="button-dificultat buttons b-right">
                    <v-select class="buttons-size" label="Dificultat" variant="underlined" v-model="dificultat" :items="['Fàcil', 'Mitjà', 'Difícil']"></v-select>
                </div> -->
                <div class="button-nJugadors buttons b-left">
                    <v-select class="buttons-size" label="nº Jugadors" variant="underlined" v-model="maxJugadors" :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]" name="maxJugadors"></v-select>
                </div>
                <div class="button-limit buttons b-right">
                    <v-select class="buttons-size" label="Limit de temps" variant="underlined" v-model="limit" :items="['Sense límit', '20 Preguntes', '10 Preguntes', '5 minuts', '10 minuts']"></v-select>
                </div>
            </div>
        </div>
        <div class="button-crearPartida-background">
            <v-btn class="button-crearPartida" @click="crear">Crear partida</v-btn>
        </div>
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
    background-color: rgb(226, 65, 4);
}

.title {
    font-size: 8vh;
    color: #ffc00a;
    margin-left: 3vw;
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
    margin-top: 1.2vh;
    width: 13vw;
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
    background-color: rgba(51, 204, 204, 1);
    border: 3px solid rgba(10, 163, 163, 1);
    box-shadow: inset 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
}

.b-right {
    border-radius: 0px 60px 0px 60px;
    background-color: rgba(51, 204, 204, 1);
    border: 3px solid rgba(10, 163, 163, 1);
    box-shadow: inset 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
}

.buttons{
    width: 18vw;
    height: 8vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    color: rgba(235, 33, 60, 1);
}

.buttons-size{
    /* mida */
    width: 14vw;
    height: 6vh;
    /* aliniació */
    margin-top: 0.7vh;
}

.button-crearPartida-background{
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

.button-crearPartida{
    color: rgba(70, 23, 143, 1);
    font-family: 'Battle Beasts';
    font-style: normal;
    font-size: 65px;
    font-weight: 400;
    line-height: 1.2;
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

        crear() {
            const store = useAppStore();
            socket.emit('crearPartida', this.nom, this.maxJugadors, store.loginInfo.username);
            this.$router.push('/lobby');
        }
    },

    mounted() {
    },
    created() {

    },

}
</script>
