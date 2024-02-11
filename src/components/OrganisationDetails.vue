<template>
  <div>
    <!-- Organisation details -->
    <v-container v-if="!isVisible">
      <v-row>
        <v-col style="">
          name : <br>
          <p class="text-h4">{{ getCurrentOrganisation.name }}</p><br>
          <!--          {{ getCurrentOrganisation }} <br>-->
          <div v-if="getCurrentOrganisation.secret">
            password:
            <p class="text-h6">{{ getCurrentOrganisation.secret }}</p>
            <TeamsList
                v-if="getCurrentOrganisation.secret"
                :teamList="getCurrentOrganisation.teams"/>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Error dialog when component shown but no organisation is selected -->
    <v-dialog v-model="isVisible" persistent max-width="300px">
      <v-card>
        <v-card-title class="text-h5">Error</v-card-title>
        <v-card-text>No organisation is currently selected/ Incorrect password</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="alertClosed">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Connection dialog to log in -->
    <LoginDialog/>
  </div>
</template>

<script>
import TeamsList from "@/components/TeamsList"
import LoginDialog from "@/components/LoginDialog.vue";
import {mapActions, mapGetters} from "vuex"

export default {
  name: "OrganisationDetails",
  components: {
    TeamsList,
    LoginDialog
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['getCurrentOrganisation', 'getOrganisationsPassword']),
    isVisible() {
      return !this.getCurrentOrganisation
    }
  },
  methods: {
    ...mapActions(['setOrganisationsPassword', 'getOrganisationById']),
    alertClosed() {
      this.$router.push({name: 'organisationsList'})
    }
  }
}
</script>
