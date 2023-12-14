<template>
  <div class="container">
    <div class="container__register">
      <v-card class="mx-auto register" title="Registrar">
        <v-container >
          <v-text-field v-model="first" color="deep-purple-darken-1" label="First name" variant="solo" ></v-text-field>

          <v-text-field v-model="last" color="deep-purple-darken-1" label="Last name" variant="solo"></v-text-field>

          <v-text-field v-model="email" color="deep-purple-darken-1" label="Email" variant="solo"></v-text-field>

          <v-text-field v-model="password" color="deep-purple-darken-1" label="Password" placeholder="Enter your password"
            variant="solo"></v-text-field>

          <div class="button-box">
            <v-btn color="#33cccc">Registrar-se</v-btn>
          </div>
        </v-container>
      </v-card>
    </div>
    <div class="container__imgenRegister"></div>
  </div>
</template>
<style scoped>

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

.container__imgenRegister{
  background-image: url('../assets/backgrounds/background-register.png');
  height: 100vh;
  background-size: cover;
}

.register{
  background-color: rgb(37, 7, 107,0.8);
  height: 60vh;
  border-radius: 6px;
  width: clamp(48vh,50%,35vh);
  color: aliceblue;
}

.button-box{
  display: flex;
  justify-content: end;
}
</style>
<script>
import  CommunicationManager from '../communicationManager.js';
import { useAppStore } from '../store/app';
import router from '@/router';
export default {
  data: () => ({
    first: null,
    last: null,
    email: null,
    password: null,
    password_confirmation: null,
    terms: false,
    manager: new CommunicationManager(),

  }),
  methods: {
    async submit() {
      const store = useAppStore();
      console.log(this.nom,this.email,this.password,this.password_confirmation);
      let response = await this.manager.register(this.nom,this.email,this.password,this.password_confirmation);
      console.log(response);
      if(response.status == 201){
        store.setLoginInfo(true,response.user.nom,response.token);
        router.push('/partides');
      }
      else{
        alert(response.missatge);
      }
    },
  },
}
</script>