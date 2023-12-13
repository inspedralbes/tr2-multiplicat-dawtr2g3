<template>
  <div>
    <h1 class="title-landing text-center">Math Royale</h1>
    <div class="container">
      <div class="container__card card">
        <v-card class="pa-5" color="#864cbf" width="500">
          <div class="card__items items">
            <div class="items__avatar avatar">
              <v-avatar class="avatar__image" image="../assets/Avatar_22.png" size="100"></v-avatar>
              <v-btn class="avatar-refresh" size="x-small" icon>
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </div>
            <div class="items__userName userName">
              <v-text-field class="pa-2" label="UserJugador" id="nomJugador"></v-text-field>
            </div>
            <div class="items__btn-tutorial btn-tutorial">
              <v-btn rounded color="#106b03" class="px-5 mr-5 mt-3">Tutorial</v-btn>
            </div>
            <div class="items__btn-log-reg">
              <v-btn rounded color="#fad09e" class="px-5 ml-2 mt-3 text-white" @click="$router.push('/register')">Registre</v-btn>
              <v-btn rounded color="#f5a23d" class="px-5 ml-2 mt-3 text-white" @click="$router.push('/login')">Login</v-btn>
            </div>
          </div>
        </v-card>
      </div>
      <div class="container__buttons buttons">
        <v-btn rounded="xl" class="btn__entrar" color="#f5a23d" size="x-large" @click="empezar">Entrar</v-btn>
        <v-btn rounded="xl" class="btn__crear" color="#f5a23d" size="x-large">Crear</v-btn>
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
    position: relative;
    left: 30vh;
  }

  .card__items {
    display: grid;
    grid-template-columns: 0.5fr 1fr; 
    grid-row-gap: 7%;
    grid-template-areas: 
    "avatar userName"
    "tutorial logReg";
  }

  .items__avatar {
    grid-area: avatar;
    display: flex;
    justify-content: center;
    
  }

  .avatar-refresh {
    top: 72%;
    right: 25%;
  }

  .items__userName {
    grid-area: userName;
    display: flex;
    justify-content: center;
  }

  .items__btn-tutorial {
    grid-area: tutorial;
    display: flex;
    justify-content: start;
    border-top: 1px solid rgb(255, 255, 255);
  }
  
  .items__btn-log-reg {
    grid-area: logReg;
    display: flex;
    justify-content: end;
    border-top: 1px solid rgb(255, 255, 255);
  }

  .container__buttons {
    margin: auto;
    height: 20vh;
    width: 500px;
    justify-content: center;
    align-items: center;
    display: grid;
    position: relative;
    right: 20vh;
  }

  .btn__entrar, .btn__crear {
    font-size: 3rem !important;
  }

  @media screen and (max-width: 1350px) {
    
    .container {
      width: 100vw;
      height: 50vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .container__card {
      left: 10vh;
    }

    .container__buttons {
      right: 10vh;
    }
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
