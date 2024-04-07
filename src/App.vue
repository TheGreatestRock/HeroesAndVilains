<template>
  <v-app>
    <NavBar/>
    <v-main>
      <router-view @error="showError"></router-view>
    </v-main>
    <ErrorDialog ref="errorDialog" />
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import ErrorDialog from './components/ErrorDialog.vue';

export default {
  components: {
    NavBar,
    ErrorDialog,
  },
  methods: {
    showError(message) {
      this.$refs.errorDialog.showDialog = true;
      this.$refs.errorDialog.errorMessage = message;
    },
  },
};
</script>
