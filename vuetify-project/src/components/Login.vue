<template>
  <h1>MATH ROYALE</h1>
  <div class="container">
    <div class="container__login">
      <v-form v-model="form" class="login">
        <div class="container__form">
          <v-text-field v-model="user" variant="solo"  :rules="[required]"  label="User" class="input__text"></v-text-field>
          <v-text-field type="password" v-model="password" variant="solo" :readonly="loading" :rules="[required]" label="Password"
          placeholder="Enter your password" class="input__text"></v-text-field>
          <v-btn class="sign">Entrar</v-btn>
        </div>
        
      </v-form>
    </div>
    <div class="container-imagen"></div>
  </div>
</template>
<style>

* {
  padding: 0;
  margin: 0;
}

body {
  background-color: blueviolet;
}

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

h1{
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
export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return

      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
    required(v) {
      return !!v || 'Field is required'
    },
  },
}
</script>