<template>
    <iconsHead></iconsHead>
    <div class="container">
        <form @submit.prevent="submit">
            <h1 class="title">Formulari per crear pregunta</h1>
            <div class="form-group">
                <label for="enunciat">Enunciat</label>
                <input type="text" v-model="enunciat" class="form-control" id="enunciat">
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
                <label for="temps">Temps per respondre</label>
                <input type="number" v-model="temps" @input="(e)=>{
                    if(e.target.value < 0){
                        e.target.value = 0;
                    }
                    if(e.target.value > 100){
                        e.target.value = 100;
                    }
                }" class="form-control" id="temps">
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
            token: computed(() => store.getToken()),
        };
    },

    methods: {
        async submit() {
            let resposta = await this.manager.crearPregunta(
                this.temps,
                this.enunciat,
                1,
                this.dificultat,
                this.categoria,
                this.resposta1,
                this.resposta2,
                this.resposta3,
                this.resposta4,
                this.token
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
.title{
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
}
.container {
    max-width: 400px;
    margin: 0 auto;
    border-radius: 5px;
    margin-top: 5vh;
}
.form-control{
    width: 100%;
    padding: 10px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: 1px solid #ccc;
    background-color: rgb(209, 209, 209);
    box-sizing: border-box;
    border-radius: 5px;

}
.form-group {
    margin-bottom: 20px;
    background-color: #fff;
    padding: 5px;
    width: 95%;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    margin-left: auto;
    position: relative;
    right: 0;
    width: 50%;
    margin-left: 25%;
}

.btn-primary:hover {
    background-color: #0069d9;
}
</style>
