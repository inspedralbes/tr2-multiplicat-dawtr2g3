<template>
  <div>
    <h1>Landing Page</h1>
    <input type="text" id="nomJugador">
    <Button label="Jugar" @click="empezar"></Button>
  </div>

</template>
<script>
// import { useAppStore } from "../stores/app.js";
import { socket } from '../socket';
import router from '@/router'

export default {
  data() {
    return {

    };
  },
  methods: {
    empezar(){
      console.log("empezar");
      socket.emit('join',document.getElementById("nomJugador").value);
      router.push('/lobby');
    }
  },

  mounted() {
  },
  created() {

  },
  
}
</script>
