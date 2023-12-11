<template>
  <div>
    <h1 class="title-landing text-center mb-5">Math Royale</h1>
    <div class="text-center">
      <v-row>
        <v-col class="text-center d-flex align-center justify-end">
          <v-card class="mr-5 pa-4" width="400">
            <v-text-field class="pa-2" label="UserJugador" id="nomJugador"></v-text-field>
            <v-btn rounded color="#106b03" class="px-5 mr-5">Tutorial</v-btn>
            <v-btn rounded color="#fad09e" class="px-5 ml-2 text-white">Registre</v-btn>
            <v-btn rounded color="#f5a23d" class="px-5 ml-2 text-white">Login</v-btn>
          </v-card>
        </v-col>
        <v-col class="text-center d-flex align-center justify-start">
          <v-row>
            <v-col>
              <v-btn rounded class="ma-4 text-black" color="#f5a23d" @click="empezar">Entrar</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn rounded class="ma-4 text-black" color="#f5a23d">Crear</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style>
* {
  /* background-color: #46178f; */
}

.title-landing {
  font-family: "Battle Beasts";
  font-size: 6rem !important;
  font-weight: 300;
  line-height: 6rem;
  text-transform: none !important;
  color: #ffc00a;
}

v-col {
  margin: 0;
  padding: 0;
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
    empezar() {

      const store = useAppStore();
      console.log("empezar");
      let nick = document.getElementById("nomJugador").value;
      socket.emit('join', nick);
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
