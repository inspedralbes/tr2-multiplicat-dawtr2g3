<template>
    <v-card class="ma-4 pa-4" width="400">
      <v-card-title>Landing Page</v-card-title>
      <v-card-item>
        <v-text-field class="pa-2" label="UserJugador" id="nomJugador"></v-text-field>
      </v-card-item>
      <v-card-actions>
        <v-btn class="pa-2" @click="empezar">Jugar</v-btn>
      </v-card-actions>
    </v-card>
    <button @click="$router.push('/login')">Login</button>
    <button  @click="$router.push('/register')">Register</button>
</template>
<script>
// import { useAppStore } from "../stores/app.js";
import { socket } from '../socket';
import { useAppStore } from '@/store/app';
import router from '@/router'

export default {
  data() {
    return {

    };
  },
  methods: {
    empezar(){
      
      const store = useAppStore();
      let nick = document.getElementById("nomJugador").value;
      store.setNick(nick);
      router.push('/partides');

    }
  },

  mounted() {
  },
  created() {

  },

}
</script>
