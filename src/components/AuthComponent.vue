<template>
  <div>
    <h1>Connexion</h1>
    <form @submit.prevent="gologin">
      <label for="login">Identifiant :</label>
      <input type="text" id="login" v-model="login" required>
      <br>
      <label for="password">Mot de passe :</label>
      <input type="password" id="password" v-model="password" required>
      <br>
      <button type="submit">Connexion</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      login: '',
      password: '',
      error: '',
    };
  },
  methods: {
    ...mapActions('auth', {
      performLogin: 'login',
      getUser: 'getUser'
    }),
    async gologin() {
      try {
        await this.performLogin({ login: this.login, password: this.password });
        console.log(await this.getUser(this.login));
        this.$router.push('/');
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};


</script>
