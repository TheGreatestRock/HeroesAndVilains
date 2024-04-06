<template>
  <div>
    <!-- Organisation details -->
    <v-container v-if="!isVisible">
      <v-row>
        <v-col style="">
          name : <br>
          <p class="text-h4">{{ getCurrentTeam.name }}</p><br>

          <HeroList
            v-if="getCurrentOrganisation.secret"
            :hero-list="getCurrentTeam.members"
          />

        </v-col>
      </v-row>
    </v-container>

    <!-- Error dialog when component shown but no Team is selected -->
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

  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import HeroList from "@/components/HeroList.vue";

  export default {
    name: "TeamDetails",
    components: {HeroList},
    data: () => ({}),
    computed: {
      ...mapGetters(['getCurrentTeam', 'getCurrentOrganisation']),
      isVisible() {
        return !this.getCurrentTeam
      }
    },
    methods: {
      alertClosed() {
        this.$router.push({name:'teamsList'})
      }
    },
    //go to / if there are no teams selected
    created() {
      if (!this.getCurrentTeam) {
        this.$router.push({name:'teamsList'})
      }
    }
  }
</script>