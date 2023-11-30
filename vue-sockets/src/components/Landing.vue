<template>
  <div>
    <h1>Landing Page</h1>
    <Button label="Jugar" @click="empezar"></Button>
  </div>

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

      socket.emit('join');

    }
  },

  mounted() {
  },
  created() {

  },
  
}
</script>
