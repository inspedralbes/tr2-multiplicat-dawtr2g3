<template>
    <iconsHead></iconsHead>
    <label for="enunciat">Enunciat</label>
    <input type="text" v-model="enunciat">
    <label for="tipus">Tipus</label>
    <select v-model="tipus" name="tipus" id="tipus">
        <option value="1">Resposta multiple</option>
        <option value="2">Drag and drop</option>
    </select>
    <select v-model="categoria" name="categoria" id="categoria">
        <option value="1">Unitats de longitud</option>
        <option value="2">Unitats de temps</option>
        <option value="3">Unitats de massa</option>
        <option value="4">Unitats de volum</option>
        <option value="5">Velocitat</option>
    </select>
    <select v-model="dificultat" name="dificultat" id="dificultat">
        <option value="1">Facil</option>
        <option value="2">Mitja</option>
        <option value="3">Dificil</option>
    </select>
    <label for="temps">Temps</label>
    <input type="number" v-model="temps">
    <label for="resposta1">Resposta correcte</label>
    <input type="text" v-model="resposta1">
    <label for="resposta2">Resposta incorrecte 1</label>
    <input type="text" v-model="resposta2">
    <label for="resposta3">Resposta incorrecte 2</label>
    <input type="text" v-model="resposta3">
    <label for="resposta4">Resposta incorrecte 3</label>
    <input type="text" v-model="resposta4">
    <button @click="submit">Crear pregunta</button>
</template>

<script>
import { socket } from '../socket';
import { computed } from 'vue';
import  CommunicationManager from '../communicationManager.js';
import { useAppStore } from "../store/app.js";

import iconsHead from './iconesHead.vue';

export default {
    components: {
        iconsHead,
    },
    data() {
        const store = useAppStore();

        return {
            manager: new CommunicationManager(),
            enunciat: "",
            tipus: "",
            temps: 0,
            dificultat: "",
            categoria: "",
            resposta1: "",
            resposta2: "",
            resposta3: "",
            resposta4: "",
        };
    },

    methods: {
        async submit(){
           let resposta = await this.manager.crearPregunta(this.temps,this.enunciat, this.tipus, this.dificultat, this.categoria, this.resposta1, this.resposta2, this.resposta3, this.resposta4);
            console.log(resposta);
        }
        
    },

    mounted() {
        

    },

}
</script>

<style lang="scss" scoped></style>