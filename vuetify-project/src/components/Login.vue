<template>
  <icons-head></icons-head>
  <h1 class="title-login">MATH ROYALE</h1>
  <div class="container">
    <div class="container__login">
      <v-form v-model="form" @submit="submit()" class="login">

        <div class="container__form">
          <h2 class="title__loginForm">Login</h2>
          <v-text-field v-model="nick" variant="solo" :rules="[required]" label="User" class="input__text"></v-text-field>
          <v-text-field type="password" v-model="password" variant="solo" :readonly="loading" :rules="[required]"
            label="Password" placeholder="Enter your password" class="input__text"></v-text-field>
          <v-btn @click="submit()" v-if="!loading" class="sign">Entrar</v-btn>
          <img src="../assets/loading.gif" v-if="loading" alt="loading" width="50px" height="50px">

        </div>

      </v-form>
    </div>
    <div class="container-imagen"></div>
  </div>
</template>
<style scoped>
.container {
  width: 100vw;
  height: 50vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.sign {
  background-color: #33cccc;
}

.container__login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  border-radius: 10px;
}

.login {
  background-color: rgb(37, 7, 107, 0.8);
  height: 50vh;
  border-radius: 6px;
  width: clamp(48vh, 50%, 35vh);
}

.container-imagen {
  background-image: url('../assets/backgrounds/background-login.png');
  height: 100vh;
  background-size: cover;
}

.input__text {
  color: aliceblue;
}

.title-login {
  color: #ffa502;
  font-family: 'Battle Beasts';
  display: flex;
  position: absolute;
  margin-top: 1.4rem;
  margin-left: 5rem;
  font-size: 2vw;
}

.container__form {
  width: 40vh;
  position: relative;
  top: 8vh;
  margin-left: auto;
  margin-right: auto;
}

.title__loginForm {
  color: aliceblue;
  margin-bottom: 3vh;

}
</style>

<script>
import store from '@/store';
import CommunicationManager from '../communicationManager.js';
import router from '@/router'
import { useAppStore } from '@/store/app';
import Toastify from 'toastify-js';

import iconsHead from './iconesHead.vue';

export default {
  components: {
    iconsHead
  },
  data: () => ({
    form: false,
    nick: null,
    password: null,
    loading: false,
    manager: new CommunicationManager(),
  }),

  methods: {
    async submit() {
      this.loading = true

      const store = useAppStore();
      let response = await this.manager.login(this.nick, this.password);

      if (response.status == 201) {
        store.setLoginInfo(true, response.user.nom, response.token, response.user.verificat);
        router.push('/');
      }
      else {
        this.loading = false;
        Toastify({

          text: response.missatge,
          backgroundColor: '#FC1A1A',
          duration: 3000

        }).showToast();
      }
    },
    onSubmit() {
      if (!this.form) return

      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
    required(v) {
      return !!v || 'Field is required'
    },
  },
  mounted() {
  },
}
</script>