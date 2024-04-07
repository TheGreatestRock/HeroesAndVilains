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
  watch: {
    isVisible(newValue) {
      if (newValue) {
        this.$emit('error', 'No organisation is currently selected/ Incorrect password');
      }
    },
  },
  methods: {
    ...mapActions(['setOrganisationsPassword', 'getOrganisationById']),
    alertClosed() {
      this.$router.push({name: 'organisationsList'})
    }
  }
}
</script>

<style scoped>
</style>
