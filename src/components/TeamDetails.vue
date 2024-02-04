<template>
  <div>
    <v-dialog v-model="isVisible" persistent max-width="300px">
      <v-card>
        <v-card-title class="text-h5">Error</v-card-title>
        <v-card-text>No team is currently selected</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="alertClosed">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    {{ getCurrentTeam }}
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "TeamDetails",
    data: () => ({}),
    computed: {
      ...mapGetters(['getCurrentTeam']),
      isVisible() {
        return !this.getCurrentTeam
      }
    },
    methods: {
      alertClosed() {
        this.$router.push({name:'teamsList'})
      }
    }
  }
</script>