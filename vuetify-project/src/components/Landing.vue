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
</template>
<script>
// import { useAppStore } from "../stores/app.js";
import { socket } from '../socket';

export default {
  data() {
    return {

    };
  },
  methods: {
    empezar(){
      console.log("empezar");
      socket.emit('join',document.getElementById("nomJugador").value);

    }
  },

  mounted() {
  },
  created() {

  },

}
</script>
