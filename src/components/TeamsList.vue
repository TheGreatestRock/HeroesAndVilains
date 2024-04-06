<template>
  <div class="ma-10">
    <h2>List of all teams</h2>
    <v-btn @click="showCreateDialog = true;" color="primary" class="mr-5">
      <span v-if="!teamList">
        Create new Team
      </span>
      <span v-else>
        Create and add new Team
      </span>
    </v-btn>
    <v-btn v-if="teamList" @click="showAdditionDialog = true" color="primary" class="mr-5">Add team</v-btn>
    <v-btn @click="selectTeam" color="primary">View</v-btn>
    <v-card class="mx-auto" max-width="700">
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
          :headers="headers"
          :items="teamList ? teamList : getTeams"
          :single-select="true"
          :search="search"
          item-key="_id"
          show-select
          class="elevation-1"
      >
        <template slot="item.actions" slot-scope="{ item }">
          <v-icon
              small
              @click="delectionAction(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog to create new team -->
    <v-dialog persistent v-model="showCreateDialog">
      <v-card>
        <v-card-title class="text-h5">
          <span v-if="!teamList">
            Create new Team
          </span>
          <span v-else>
            Create and add new Team
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-alert v-model="showCreationError" color="red" type="error">
                Creation failed
              </v-alert>
            </v-row>
            <v-row>
              <v-text-field label="Team's name" v-model="teamCreation.name"/>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
              color="red darken-1"
              text
              @click="showCreateDialog = false; showCreationError = false"
          >
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="confirmCreate">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog to add an existing team to the organisation -->
    <v-dialog persistent v-model="showAdditionDialog">
      <v-card>
        <v-card-title>
          Addition of team to organisation {{ getCurrentOrganisation.name || "" }}
        </v-card-title>
        <v-card-text>
          <v-combobox
              v-model="teamsToAdd"
              multiple
              :items="addableTeam"
              item-text="name"
              label="Select teams"
          ></v-combobox>
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="red darken-1"
              text
              @click="showAdditionDialog = false; showAdditionError = false"
          >
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="confirmAddition">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog to confirm team deletion from organisation -->
    <v-dialog persistent v-model="showDeletionDialog">
      <v-card>
        <v-card-title>
          Team deletion from organisation {{ getCurrentOrganisation.name || "" }}
        </v-card-title>
        <v-card-text>
          <v-alert
              v-model="showDeletionError"
              color="red"
              type="error"
          >
            Deletion failed
          </v-alert>
          Are you sure you want to delete this team from your organisation ?
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="red darken-1"
              text
              @click="showDeletionDialog = false; showDeletionError = false"
          >
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="confirmDeletion">
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
  name: "TeamList",
  props: {
    teamList: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    search: "",
    showCreateDialog: false,
    showCreationError: false,
    showDeletionDialog: false,
    showDeletionError: false,
    showAdditionDialog: false,
    showAdditionError: false,
    teamCreation: {name: ""},
    teamToDelete: {},
    teamsToAdd: []
  }),
  computed: {
    ...mapGetters(["getTeams", "getCurrentTeam", "getCurrentOrganisation"]),
    headers() {
      let headers = [{text: 'Name', value: 'name'}, {text: 'Number of affiliations', value: 'nbAffiliations'}]
      if (this.teamList)
        headers.push({text: 'Actions', value: 'actions', sortable: false})
      return headers
    },
    selected: {
      get() {
        return [this.getCurrentTeam];
      },
      set(selectedTeams) {
        console.log(selectedTeams);
        this.setCurrentTeam(selectedTeams[0]);
      },
    },
    addableTeam() {
      return this.getTeams.filter(teamA => !this.getCurrentOrganisation.teams.some(teamB => teamA._id === teamB._id))
    }
  },
  methods: {
    ...mapActions(["getTeamsData", "setCurrentTeam", "createTeam", "getOrganisationById", "addTeamToOrganisation", "removeTeamFromOrganisation"]),
    selectTeam() {
      this.$router.push({name: "currentTeamDetails"});
    },
    async confirmCreate() {
      const answer = await this.createTeam(this.teamCreation);
      if (answer.error === 0) {
        this.teamCreation = {name: ""};
        await this.getTeamsData();
        this.showCreateDialog = false;
        this.showCreationError = false;

        // If the component is used to display an organisation's teams
        if (this.teamList) {
          await this.addTeamToOrganisation(answer.data._id)
          await this.getOrganisationById()
        }
      } else {
        console.log(answer);
        this.showCreationError = true;
      }
    },
    delectionAction(team) {
      this.teamToDelete = team
      this.showDeletionDialog = true
    },
    async confirmDeletion() {
      const answer = await this.removeTeamFromOrganisation(this.teamToDelete._id)
      if (answer.error === 0) {
        this.teamToDelete = {}
        await this.getOrganisationById()
        this.showDeletionDialog = false
        this.showDeletionError = false
      } else {
        console.log(answer)
        this.showDeletionError = true
      }
    },
    async confirmAddition() {
      let anErrorOccured = false
      let answer = null
      for (let team of this.teamsToAdd) {
        answer = await this.addTeamToOrganisation(team._id)
        if (answer.error !== 0) anErrorOccured = true
      }
      await this.getOrganisationById()
      if (anErrorOccured)
        this.showAdditionError = true
      else {
        this.teamsToAdd = []
        this.showAdditionError = false
        this.showAdditionDialog = false
      }
    }
  },
  async mounted() {
    if (this.getCurrentOrganisation) {
    await this.getTeamsData();
  } else {
    this.$router.push({ name: 'organisationsList' });
  }
  },

};
</script>
