<template>
  <div class="container">
    <div class="container__register">
      <v-card class="mx-auto register" max-width="344" title="Registrar">
        <v-container >
          <v-text-field v-model="first" color="deep-purple-darken-1" label="First name" variant="solo" ></v-text-field>

          <v-text-field v-model="last" color="deep-purple-darken-1" label="Last name" variant="solo"></v-text-field>

          <v-text-field v-model="email" color="deep-purple-darken-1" label="Email" variant="solo"></v-text-field>

          <v-text-field v-model="password" color="deep-purple-darken-1" label="Password" placeholder="Enter your password"
            variant="solo"></v-text-field>

          <v-btn class="button__register">Entrar</v-btn>
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

.button__register {
  background-color: #33cccc;
  position: static;
  display: flex;
  margin-left: 30vh;
}
</style>
<script>
export default {
  data: () => ({
    first: null,
    last: null,
    email: null,
    password: null,
    terms: false,
  }),
}
</script>