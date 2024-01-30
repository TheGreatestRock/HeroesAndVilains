<template>
  <div>
    <h2>List of all teams</h2>
    <v-btn @click="createTeam" color="primary">Create new Team</v-btn>
    <v-btn @click="selectTeam" color="primary">Modify</v-btn>
    <v-card
        class="mx-auto"
        max-width="700">
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Chercher"
          single-line
          hide-details
      >
        <template v-slot:append-outer>
          <v-icon @click="search=''">mdi-close</v-icon>
        </template>
      </v-text-field>
      <v-data-table
          v-model="selected"
          :headers="[{ text: 'Name', value: 'name' }, { text: 'Number of affiliations', value: 'nbAffiliations' }]"
          :items="getTeams"
          :single-select="true"
          :search="search"
          item-key="_id"
          show-select
          class="elevation-1"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TeamDetails",
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapGetters(['getTeams', 'getCurrentTeam']),
    selected: {
      get() {
        return [this.getCurrentTeam]
      },
      set(selectedTeams) {
        this.setCurrentTeam(selectedTeams[0])
      }
    }
  },
  methods: {
    ...mapActions(['getTeamsData', 'setCurrentTeam']),
    selectTeam() {
      this.$router.push({name: 'currentTeamDetails'})
    },
    createTeam() {

    }
  },
  async mounted() {
    await this.getTeamsData()
    console.log(this.getTeams)
  }
}
</script>