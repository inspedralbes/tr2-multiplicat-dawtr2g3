<template>
  <div>
    <h1 class="title-landing text-center">Math Royale</h1>
    <div class="container">
      <div class="container__card card">
        <v-card class="mr-5 pa-4" width="400">
          <v-avatar image="../assets/Avatar_22.png" size="80">
            <!-- <v-btn icon="$vuetify">
              Button
            </v-btn> -->
          </v-avatar>
          <v-text-field class="pa-2" label="UserJugador" id="nomJugador"></v-text-field>
          <v-btn rounded color="#106b03" class="px-5 mr-5">Tutorial</v-btn>
          <v-btn rounded color="#fad09e" class="px-5 ml-2 text-white">Registre</v-btn>
          <v-btn rounded color="#f5a23d" class="px-5 ml-2 text-white">Login</v-btn>
        </v-card>
      </div>
      <div class="container__buttons buttons">
        <div class="buttons__entrar entrar">
          <v-btn rounded="xl" class="btn__entrar" color="#f5a23d" size="x-large" @click="empezar">Entrar</v-btn>
        </div>
        <div class="buttons__crear crear"> 
          <v-btn rounded="xl" class="btn__crear" color="#f5a23d" size="x-large">Crear</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- CENTRAR FONDO https://es.godaddy.com/blog/imagen-responsive-en-css3-para-el-fondo-de-tu-web/ -->
<style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    background-image: url("../assets/background-general.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #464646;
  }

  .title-landing {
    font-family: "Battle Beasts";
    font-size: 10rem !important;
    font-weight: 300;
    line-height: 6rem;
    text-transform: none !important;
    color: #ffc00a;
    margin-top: 10%;
    margin-bottom: 5%;
  }

  .container {
    width: 100vw;
    height: 50vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .container__card {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container__buttons {
    display: grid;
    align-items: center;
    justify-content: center;
  }

  .btn__entrar, .btn__crear {
    font-size: 3rem !important;
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
