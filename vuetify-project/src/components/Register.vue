<template>
  <v-card class="mx-auto" max-width="344" title="User Registration">
    <v-container>
      <v-text-field v-model="nom" color="primary" label="Nom" variant="underlined"></v-text-field>

      <v-text-field v-model="email" color="primary" label="Email" variant="underlined"></v-text-field>

      <v-text-field v-model="password" type="password" color="primary" label="Password" placeholder="Enter your password"
        variant="underlined"></v-text-field>
        <v-text-field v-model="password_confirmation" type="password" color="primary" label="Password" placeholder="Enter your password"
        variant="underlined"></v-text-field>
      <v-checkbox v-model="terms" color="secondary" label="I agree to site terms and conditions"></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success">
        Complete Registration

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  <button @click="submit">Submit</button>
</template>

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