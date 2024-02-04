<template>
  <div>
    <h2>List of all teams</h2>
    <v-btn @click="showCreateTeam" color="primary">Create new Team</v-btn>
    <v-btn @click="selectTeam" color="primary">Modify</v-btn>
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
        :headers="[{ text: 'Name', value: 'name' }, { text: 'Number of affiliations', value: 'nbAffiliations' }]"
        :items="teamList ? teamList : getTeams"
        :single-select="true"
        :search="search"
        item-key="_id"
        show-select
        class="elevation-1"
      >
      </v-data-table>
    </v-card>

    <v-dialog persistent v-model="showCreateDialog">
      <v-card>
        <v-card-title class="text-h5">Create a new team</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-alert v-model="showCreationError" color="red" type="error">
                Creation failed
              </v-alert>
            </v-row>
            <v-row>
              <v-text-field label="Team's name" v-model="teamCreation.name" />
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TeamDetails",
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
    teamCreation: { name: "" },
  }),
  computed: {
    ...mapGetters(["getTeams", "getCurrentTeam"]),
    selected: {
      get() {
        return [this.getCurrentTeam];
      },
      set(selectedTeams) {
        this.setCurrentTeam(selectedTeams[0]);
      },
    },
  },
  methods: {
    ...mapActions(["getTeamsData", "setCurrentTeam", "createTeam"]),
    selectTeam() {
      this.$router.push({ name: "currentTeamDetails" });
    },
    showCreateTeam() {
      this.showCreateDialog = true;
    },
    async confirmCreate() {
      const answer = await this.createTeam(this.teamCreation);
      if (answer.error === 0) {
        this.teamCreation = { name: "" };
        await this.getTeamsData();
        this.showCreateDialog = false;
        this.showCreationError = false;
        if (this.teamList){
          //add the new team to the list and add it to the current organisation
          //this.teamList.push(answer.team);
        }
      } else {
        console.log(answer);
        this.showCreationError = true;
      }
    },
  },
  async mounted() {
    if (!this.teamList) {
      await this.getTeamsData();
      console.log(this.getTeams);
    }
  },
};
</script>
