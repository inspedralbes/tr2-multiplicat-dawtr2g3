<template>
  <div>
    <h1>Landing Page</h1>
    <input type="text" id="nomJugador">
    <Button label="Jugar" @click="empezar"></Button>
    <v-btn @click="login">Login</v-btn>
  </div>

</template>
<script>
// import { useAppStore } from "../stores/app.js";
import { useAppStore } from "../stores/app.js";
import { socket } from '../socket';
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
    },
    login(){
      router.push('/login');
    }
  },

  mounted() {
  },
  created() {

  },
  
}
</script>
