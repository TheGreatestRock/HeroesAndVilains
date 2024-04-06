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
      error: null,
    };
  },
  methods: {
    ...mapActions('auth', ['login', 'getUser']),
    async gologin() {
      try {
        await this.login({ login: this.login, password: this.password });
        const user = await this.getUser(this.login);
        console.log(user);
        this.$router.push('/');
      } catch (error) {
        this.error = error.message || 'Une erreur s\'est produite lors de la connexion.';
      }
    },
  },
};
</script>