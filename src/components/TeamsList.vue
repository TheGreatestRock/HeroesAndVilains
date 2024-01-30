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

    <v-dialog
        persistent
        v-model="showCreateDialog">
      <v-card>
        <v-card-title class="text-h5">Create a new team</v-card-title>
        <v-card-text>
          <v-container>
            <!--            TODO : Rajouter une alert pour l'état de la réponse de l'API -->
            <v-row>
              <v-text-field
                  label="Team's name"
                  v-model="teamCreation.name"
              />
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
              color="red darken-1"
              text
              @click="showCreateDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="confirmCreate"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TeamDetails",
  data: () => ({
    search: '',
    showCreateDialog: false,
    teamCreation: {name: ''}
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
      this.showCreateDialog = true
    },
    confirmCreate() {
      console.log(this.teamCreation)
    }
  },
  async mounted() {
    await this.getTeamsData()
    console.log(this.getTeams)
  }
}
</script>