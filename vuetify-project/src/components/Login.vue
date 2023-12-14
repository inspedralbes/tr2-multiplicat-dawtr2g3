<template>
  <h1 class="title-login">MATH ROYALE</h1>
  <div class="container">
    <div class="container__login">
      <v-form v-model="form" @submit="submit()" class="login">
        <div class="container__form">
          <v-text-field v-model="nick" variant="solo"  :rules="[required]"  label="User" class="input__text"></v-text-field>
          <v-text-field type="password" v-model="password" variant="solo" :readonly="loading" :rules="[required]" label="Password"
          placeholder="Enter your password" class="input__text"></v-text-field>
          <v-btn @click="submit()" class="sign">Entrar</v-btn>
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
.container__login{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  border-radius: 10px;
}
.login {
  background-color: rgb(37, 7, 107,0.8);
  height: 50vh;
  border-radius: 6px;
  width: clamp(48vh,50%,35vh);
}

.container-imagen {
  background-image: url('../assets/backgrounds/background-login.png');
  height: 100vh;
}

.input__text{
  color: aliceblue;
}

.title-login{
  color: #ffa502;
  font-family: 'Battle Beasts';
  display: flex;
  position: absolute;
}

.container__form{
  width: 40vh;
  position: relative;
  top: 13vh;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
import store from '@/store';
import  CommunicationManager from '../communicationManager.js';
import router from '@/router'
import { useAppStore } from '@/store/app';
export default {
  data: () => ({
    form: false,
    nick: null,
    password: null,
    loading: false,
    manager: new CommunicationManager(),
  }),

  methods: {
    async submit() {
      const store = useAppStore();
      let response = await this.manager.login(this.nick,this.password);

      if(response.status == 201){
        store.setLoginInfo(true,response.user.nom,response.token);
        router.push('/partides');
      }
      else{
        alert("Usuario o contraseña incorrectos");
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