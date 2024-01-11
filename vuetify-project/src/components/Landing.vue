<template>
  <icons-head></icons-head>
  <h1 class="title-landing text-center">Math Royale</h1>
  <div class="container">
    <div class="container__card card">
      <v-card class="pa-5" color="#864cbf" width="500">
        <div class="card__items items">
          <div class="items__avatar avatar">
            <v-avatar v-if="avatar == 1" class="avatar__image" image="../assets/avatar/avatarVaiolet.png"
              size="100"></v-avatar>
            <v-avatar v-else-if="avatar == 2" class="avatar__image" image="../assets/avatar/avatarCerdo.png"
              size="100"></v-avatar>
            <v-avatar v-else-if="avatar == 3" class="avatar__image" image="../assets/avatar/avatarEric.png"
              size="100"></v-avatar>
            <v-avatar v-else-if="avatar == 4" class="avatar__image" image="../assets/avatar/avatarGatoSuperman.png"
              size="100"></v-avatar>
            <v-avatar v-else-if="avatar == 5" class="avatar__image" image="../assets/avatar/avatarHamsterTrex.png"
              size="100"></v-avatar>
            <v-avatar v-else-if="avatar == 6" class="avatar__image" image="../assets/avatar/avatarHombrePeloBlanco.png"
              size="100"></v-avatar>
            <v-avatar v-else-if="avatar == 7" class="avatar__image" image="../assets/avatar/avatarLevie.png"
              size="100"></v-avatar>
            <v-avatar v-else-if="avatar == 8" class="avatar__image" image="../assets/avatar/avatarMikasa.png"
              size="100"></v-avatar>
            <v-avatar v-else-if="avatar == 9" class="avatar__image" image="../assets/avatar/avatarMujerPeloRojo.png"
              size="100"></v-avatar>
            <v-avatar v-else-if="avatar == 10" class="avatar__image" image="../assets/avatar/avatarPerroBatman.png"
              size="100"></v-avatar>
            <v-avatar v-else-if="avatar == 11" class="avatar__image" image="../assets/avatar/avatarPerroDJ.png"
              size="100"></v-avatar>
            <v-avatar v-else-if="avatar == 12" class="avatar__image" image="../assets/avatar/avatarPower.png"
              size="100"></v-avatar>
            <v-avatar v-else-if="avatar == 13" class="avatar__image" image="../assets/avatar/avatarZorro.png"
              size="100"></v-avatar>

            <v-btn class="avatar-refresh" size="x-small" icon @click="canviarAvatar()">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </div>
          <div class="items__userName userName">
            <v-text-field class="pa-2" label="UserJugador" :value="this.nom" :disabled="this.loginInfo.loggedIn"
              v-model="nom" id="nomJugador"></v-text-field>
          </div>
          <div class="items__btn-tutorial btn-tutorial">
            <v-btn rounded color="#106b03" @click="$router.push('/tutorial')" class="px-5 mr-5 mt-3">Tutorial</v-btn>
          </div>
          <div class="items__btn-log-reg">
            <v-btn rounded color="#fad09e" class="px-5 ml-2 mt-3 text-white"
              @click="$router.push('/register')">Registre</v-btn>
            <v-btn rounded color="#f5a23d" class="px-5 ml-2 mt-3 text-white" @click="$router.push('/login')">Login</v-btn>
          </div>
        </div>
      </v-card>
    </div>
    <div class="container__buttons buttons">
      <v-btn rounded="xl" class="btn__entrar" color="#f5a23d" size="x-large" :disabled='this.nom == ""'
        @click="empezar">Entrar</v-btn>
      <div class="container__button" @click="verificat">
        <v-btn rounded="xl" class="btn__crear" color="#f5a23d" size="x-large"
          :disabled='this.nom == "" || !this.loginInfo.verificat' @click="crear">Crear</v-btn>
      </div>
    </div>
  </div>
</template>
<!-- CENTRAR FONDO https://es.godaddy.com/blog/imagen-responsive-en-css3-para-el-fondo-de-tu-web/ -->
<style scoped>
.container__button {
  width: 100%;
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
  left: 12vw;
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
  right: 5vw;
}

.btn__entrar,
.btn__crear {
  font-size: 3rem !important;
  width: 100%;
}

@media screen and (max-width: 1100px) {

  .container {
    width: 100vw;
    height: 50vh;
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr;
  }

  .container__card {
    left: 0;
  }

  .container__buttons {
    margin-top: 3vh;
    right: 0;
  }
}
</style>

<script>
// import { useAppStore } from "../stores/app.js";
import { socket } from '../socket';
import { useAppStore } from '@/store/app';
import router from '@/router'
import { computed } from 'vue';
import Toastify from 'toastify-js';
import { resolveDirective } from 'vue';


import iconsHead from './iconesHead.vue';


export default {
  components
    : {
    iconsHead
  },
  data() {
    const store = useAppStore();

    return {
      fetTutorial: false,
      tempsRestant: null,
      nom: '',
      avatar: 1,
      loginInfo: {
        username: computed(() => store.loginInfo.username),
        loggedIn: computed(() => store.loginInfo.loggedIn),
        verificat: computed(() => store.loginInfo.verificat),
      },
    };
  },
  methods: {
    crearPregunta() {
      let error = false;
      if (this.loginInfo.loggedIn == false) {
        error = true

      } else {
        if (!this.loginInfo.verificat) {
          error = true;

        }
      }
      if (!error) {
        router.push('/crearPregunta')
      }
    },
    empezar() {
      const store = useAppStore();

      if (!store.tutorial) {
        store.setTutorial(true);
        router.push('/tutorial');

      }

      store.setNick(this.nom);
      router.push('/partides');

    },
    crear() {
      let error = false;
      if (this.loginInfo.loggedIn == false) {
        error = true

      } else {
        if (!this.loginInfo.verificat) {
          error = true;

        }
      }
      if (!error) {
        const store = useAppStore();
        store.setNick(this.nom);
        router.push('/crearPartida')
      }
    },
    verificat() {
      console.log(this.loginInfo.verificat);
      if (this.loginInfo.loggedIn == false) {
        Toastify({

          text: "No estas logejat",
          backgroundColor: '#FC1A1A',
          duration: 3000

        }).showToast();
      } else {
        if (!this.loginInfo.verificat) {
          Toastify({

            text: "Nomes comptes verificades poden crear partides o preguntes",
            backgroundColor: '#FC1A1A',
            duration: 3000

          }).showToast();
        }
      }
    },

    canviarAvatar() {
      let nouAvatar = Math.floor(Math.random() * 13) + 1;
      this.avatar = nouAvatar;
      const store = useAppStore();
      store.setAvatar(this.avatar);
    },


  },

  mounted() {
    const store = useAppStore();
    if (!store.tutorial) {
      var toast = Toastify({

        text: "Si us plau, fes el tutorial per poder jugar correctament fent click aqui!",
        backgroundColor: '#FC1A1A',
        duration: 5000,
        position: 'center',
        offset: {
          x: 0,
          y: '35vh'
        },
        close: true,
        onClick: function () {
          router.push('/tutorial');
          toast.hideToast();
        }

      }).showToast();
    }

    if (this.loginInfo.username != '') {
      this.nom = this.loginInfo.username;
      console.log(this.nom);
    }
  },
  created() {
    console.log(this.$router.options.history.state.back)
    if (this.$router.options.history.state.back == '/lobby' || this.$router.options.history.state.back == '/') {
      socket.emit('tornar a lobby');
      console.log('adios')
    }
  },

}
</script>
