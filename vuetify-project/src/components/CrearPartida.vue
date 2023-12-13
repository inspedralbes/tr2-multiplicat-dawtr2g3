<template>
    <div>
        <div class="formPartida">
            <label for="nom">Nom de la partida</label>
            <input type="text" v-model="nom" name="nom">
            <label for="maxJugadors">Màxim de jugadors</label>
            <div class="slidecontainer">
                <input type="range" min="2" max="40" value="20" class="slider" name="maxJugadors" v-model="maxJugadors" id="myRange">
            </div>
        </div>
        <button @click="crear">Crear partida</button>

    </div>
</template>
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
        
        crear(){
            const store = useAppStore();
            socket.emit('crearPartida',this.nom,this.maxJugadors,store.loginInfo.username);
            this.$router.push('/lobby');
        }
    },

    mounted() {
    },
    created() {

    },

}
</script>
  