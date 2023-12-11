<template>
  <div class="container">
    <div>
      <v-form v-model="form" @submit.prevent="onSubmit" class="container-login">
        <v-text-field v-model="user" :readonly="loading" :rules="[required]" clearable label="User"></v-text-field>
        <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
          placeholder="Enter your password"></v-text-field>
        <v-btn class="sign">Entrar</v-btn>
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

.container-login {
  background-color: aliceblue;
}

.container-imagen {
  background-image: url('../assets/backgrounds/background-login.png');
  height: 100vh;
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