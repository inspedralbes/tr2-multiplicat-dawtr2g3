<template>
    <iconsHead></iconsHead>
    <div class="container">
        <form @submit.prevent="submit">
            <div class="form-group">
                <label for="enunciat">Enunciat</label>
                <input type="text" v-model="enunciat" class="form-control" id="enunciat">
            </div>
            <div class="form-group">
                <label for="tipus">Tipus</label>
                <select v-model="tipus" class="form-control" id="tipus">
                    <option value="1">Resposta multiple</option>
                    <option value="2">Drag and drop</option>
                </select>
            </div>
            <div class="form-group">
                <label for="categoria">Categoria</label>
                <select v-model="categoria" class="form-control" id="categoria">
                    <option value="1">Unitats de longitud</option>
                    <option value="2">Unitats de temps</option>
                    <option value="3">Unitats de massa</option>
                    <option value="4">Unitats de volum</option>
                    <option value="5">Velocitat</option>
                </select>
            </div>
            <div class="form-group">
                <label for="dificultat">Dificultat</label>
                <select v-model="dificultat" class="form-control" id="dificultat">
                    <option value="1">Facil</option>
                    <option value="2">Mitja</option>
                    <option value="3">Dificil</option>
                </select>
            </div>
            <div class="form-group">
                <label for="temps">Temps</label>
                <input type="number" v-model="temps" class="form-control" id="temps">
            </div>
            <div class="form-group">
                <label for="resposta1">Resposta correcte</label>
                <input type="text" v-model="resposta1" class="form-control" id="resposta1">
            </div>
            <div class="form-group">
                <label for="resposta2">Resposta incorrecte 1</label>
                <input type="text" v-model="resposta2" class="form-control" id="resposta2">
            </div>
            <div class="form-group">
                <label for="resposta3">Resposta incorrecte 2</label>
                <input type="text" v-model="resposta3" class="form-control" id="resposta3">
            </div>
            <div class="form-group">
                <label for="resposta4">Resposta incorrecte 3</label>
                <input type="text" v-model="resposta4" class="form-control" id="resposta4">
            </div>
            <button type="submit" class="btn btn-primary">Crear pregunta</button>
        </form>
    </div>
</template>

<script>
import { socket } from '../socket';
import { computed } from 'vue';
import CommunicationManager from '../communicationManager.js';
import { useAppStore } from "../store/app.js";
import router from '@/router';
import Toastify from 'toastify-js';

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
        async submit() {
            let resposta = await this.manager.crearPregunta(
                this.temps,
                this.enunciat,
                this.tipus,
                this.dificultat,
                this.categoria,
                this.resposta1,
                this.resposta2,
                this.resposta3,
                this.resposta4
            );
            Toastify({

                text: "Pregunta creada correctament",
                backgroundColor: '#18AF00',
                duration: 3000

            }).showToast();
            router.push('/');
            
        },
    },
}
</script>

<style scoped>
.container {
    max-width: 400px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 20px;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
}

.btn-primary:hover {
    background-color: #0069d9;
}
</style>
