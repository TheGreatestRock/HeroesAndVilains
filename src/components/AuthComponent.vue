<template>
  <div>
    <h1>Connexion</h1>
    <form @submit.prevent="gologin">
      <label for="username">Identifiant :</label>
      <input type="text" id="username" v-model="username" required>
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
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    ...mapActions('auth', ['login', 'getUser']),
    async gologin() {
      try {
        console.log(this.username);
        console.log(this.password);
        await this.login({ login: this.username, password: this.password });
        const user = await this.getUser(this.username);
        console.log('user ',user);
        this.$router.push('/');
      } catch (error) {
        this.$emit('error', this.error);
      }
    },
  },
};
</script>
