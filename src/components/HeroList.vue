<template>
  <div class="ma-10">


    <h2>List of all heroes</h2>

<!-- Buttons -->
    <v-btn @click="showCreateDialog = true;" color="primary" class="mr-5">
      <span v-if="!heroList">
        Create new hero
      </span>
      <span v-else>
        Create and add new hero
      </span>
    </v-btn>
    <v-btn v-if="heroList" @click="showAdditionDialog = true" color="primary" class="mr-5">Add hero</v-btn>
    <v-btn @click="selectHero" color="primary">View</v-btn>

<!-- List -->
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
          :items="heroList ? heroList : []"
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

    <!-- Dialog to create new hero -->
    <v-dialog persistent v-model="showCreateDialog">
      <v-card>
        <v-card-title class="text-h5">
          <span v-if="!heroList">
            Create new Hero
          </span>
          <span v-else>
            Create and add new Hero
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
              <v-text-field label="Hero's real name" v-model="heroCreation.realName"/>
            </v-row>
            <v-row>
              <v-text-field label="Hero's public name" v-model="heroCreation.publicName"/>
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
              :items="addableHero"
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

<!--    TODO -->
    <!-- Dialog to confirm team deletion from organisation -->
    <v-dialog persistent v-model="showDeletionDialog">
      <v-card>
        <v-card-title>
          Hero deletion from organisation {{ getCurrentTeam.name || "" }}
        </v-card-title>
        <v-card-text>
          <v-alert
              v-model="showDeletionError"
              color="red"
              type="error"
          >
            Deletion failed
          </v-alert>
          Are you sure you want to delete this hero from your team ?
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
  name: "HeroList",
  props: {
    heroList: {
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
    heroCreation: {realName: "", publicName: ""},
    heroToDelete: {},
    teamsToAdd: []
  }),
  computed: {
    ...mapGetters(["getHeroes", "getCurrentTeam", "getCurrentOrganisation"]),
    headers() {
      let headers = [{text: 'Public Name', value: 'publicName'}, {text: 'Real Name', value: 'realName'}]
      if (this.heroList)
        headers.push({text: 'Actions', value: 'actions', sortable: false})
      return headers
    },
    selected: {
      get() {
        return [this.getCurrentTeam];
      },
      set(selectedTeams) {
        this.setCurrentTeam(selectedTeams[0]);
      },
    },
    addableHero() {
      return this.getHeroes
    }
  },
  methods: {
    ...mapActions(["getHeroesData", "setCurrentTeam", "createHero", "getOrganisationById", "addTeamToOrganisation", "removeHeroFromTeam", "addHeroToTeam"]),
    selectHero() {
      // TODO Add popup
    },
    async confirmCreate() {
      const answer = await this.createHero(this.heroCreation);
      if (answer.error === 0) {
        this.heroCreation = {realName: "", publicName: ""};
        // await this.getTeamsData();
        this.showCreateDialog = false;
        this.showCreationError = false;

        // If the component is used to display an organisation's teams
        if (this.heroList) {
          await this.addHeroToTeam(answer.data._id)
          // await this.getOrganisationById()
        }
      } else {
        console.log(answer);
        this.showCreationError = true;
      }
    },
    delectionAction(team) {
      this.heroToDelete = team
      this.showDeletionDialog = true
    },
    async confirmDeletion() {
      const answer = await this.removeHeroFromTeam(this.heroToDelete._id)
      if (answer.error === 0) {
        this.heroToDelete = {}
        // await this.getOrganisationById()
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
    await this.getHeroesData();
  },

};
</script>
