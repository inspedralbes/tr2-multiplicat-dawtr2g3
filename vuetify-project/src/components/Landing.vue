<template>
  <div>
    <h1 class="text-h1">Math Royale</h1>
    <v-card class="ma-4 pa-4" width="400">
      <v-card-title>Landing Page</v-card-title>
      <v-card-item>
        <v-text-field class="pa-2" label="UserJugador" id="nomJugador"></v-text-field>
      </v-card-item>
      <v-card-actions>
        <v-btn class="pa-2" @click="empezar">Jugar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
    background: #46178f;
  }

  h1{
    font-family: "Share Tech";
  }
  
</style>

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
      console.log("empezar");
      let nick = document.getElementById("nomJugador").value;
      socket.emit('join',nick);
      store.setNick(nick);
      router.push('/lobby');

    }
  },

  mounted() {
  },
  created() {

  },

}
</script>
