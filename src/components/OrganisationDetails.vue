<template>
  <div>
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
    <v-container v-if="!isVisible">
      <v-row>
        <v-col style="">
          name : <br>
          <p class="text-h4">{{getCurrentOrganisation.name}}</p><br>
          {{ getCurrentOrganisation }} <br>
          password: <br>
          <p class="text-h6">{{getCurrentOrganisation.secret}}</p> <br>
          <TeamsList :teamList="getCurrentOrganisation.teams" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TeamsList from "@/components/TeamsList";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "OrganisationDetails",
  async mounted() {
    await this.loadData();
  },
  components: {
    TeamsList
  },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {  
    };
  },
  computed: {
    ...mapGetters(['getCurrentOrganisation']),
    isVisible() {
      return !this.getCurrentOrganisation
    }
  },
  methods: {
    ...mapActions(['updateOrganisation', 'getOrganisationById']),
    async loadData() {
      await this.getOrganisationById(this.$route.params.id);
    },
    alertClosed() {
      this.$router.push({name:'organisationsList'})
    },
  }
}
</script>
