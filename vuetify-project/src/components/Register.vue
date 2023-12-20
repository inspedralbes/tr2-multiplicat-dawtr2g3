<template>
  <iconesHead></iconesHead>
  <h1 class="title-registre">Math Royale</h1>
  <div class="container">
    <div class="container__register">
      <v-card class="mx-auto register" title="Registrar">
        <v-container>
          <v-text-field v-model="nom" color="deep-purple-darken-1" label="Nickname" variant="solo"></v-text-field>

          <v-text-field v-model="email" color="deep-purple-darken-1" label="Email" variant="solo"></v-text-field>

          <v-text-field type="password" v-model="password" color="deep-purple-darken-1" label="Password"
            placeholder="Enter your password" variant="solo"></v-text-field>
          <v-text-field type="password" v-model="password_confirmation" color="deep-purple-darken-1"
            label="Password confirmation" placeholder="Confirm your password" variant="solo"></v-text-field>

          <div class="button-box">
            <v-btn v-if="!loading" color="#33cccc" @click="submit">Registrar-se</v-btn>
            <img src="../assets/loading.gif" v-if="loading" alt="loading" width="50px" height="50px">
          </div>
        </v-container>
      </v-card>
    </div>
    <div class="container__imgenRegister"></div>
  </div>
</template>
<style scoped>
.title-registre {
  color: #ffa502;
  font-family: 'Battle Beasts';
  display: flex;
  position: absolute;
  margin-top: 1.4rem;
  margin-left: 5rem;
  font-size: 2vw;
}
.container {
  width: 100vw;
  height: 60vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.container__register {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  border-radius: 10px;

}

.container__imgenRegister {
  background-image: url('../assets/backgrounds/background-register.png');
  height: 100vh;
  background-size: cover;
}

.register {
  background-color: rgb(37, 7, 107, 0.8);
  height: 60vh;
  border-radius: 6px;
  width: clamp(48vh, 50%, 35vh);
  color: aliceblue;
}

.button-box {
  display: flex;
  justify-content: end;
}
</style>
<script>
import CommunicationManager from '../communicationManager.js';
import { useAppStore } from '../store/app';
import router from '@/router';
import Toastify from 'toastify-js';

import iconesHead from './iconesHead.vue';

export default {
  components: {
    iconesHead
  },
  data: () => ({
    first: null,
    last: null,
    email: null,
    nom: null,
    password: null,
    password_confirmation: null,
    terms: false,
    loading: false,
    manager: new CommunicationManager(),

  }),
  methods: {
    async submit() {
      this.loading = true;
      const store = useAppStore();
      let response = await this.manager.register(this.nom, this.email, this.password, this.password_confirmation);
      console.log(response);
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
  },
}
</script>