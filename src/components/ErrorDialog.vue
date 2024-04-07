<template>
    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">
          Erreur
        </v-card-title>
        <v-card-text>
          <p>{{ errorMessage }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showDialog: false,
        errorMessage: '',
      };
    },
  };
  </script>
  