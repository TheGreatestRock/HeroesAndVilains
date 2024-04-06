<template>
  <div class="ma-10">
    <h2>List of all heroes</h2>
    <v-btn @click="showCreateDialog = true;" color="primary" class="mr-5">
      <span v-if="!heroList">Create new hero</span>
      <span v-else>Create and add new hero</span>
    </v-btn>
    <v-btn v-if="heroList && addableHero.length > 0" @click="showAdditionDialog = true" color="primary" class="mr-5">Add hero</v-btn>
    <v-btn @click="select" color="primary">View</v-btn>
    <v-card class="mx-auto" max-width="700">
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
        <template v-slot:append-outer>
          <v-icon @click="search=''">mdi-close</v-icon>
        </template>
      </v-text-field>
      <v-data-table v-model="selectedHero" :headers="headers" :items="members" item-key="_id" show-select :single-select="true" class="elevation-1">
        <template slot="item.actions" slot-scope="{ item }">
          <v-icon small @click="deletionAction(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog persistent v-model="showCreateDialog">
      <v-card>
        <v-card-title class="text-h5">
          <span v-if="!heroList">Create new Hero</span>
          <span v-else>Create and add new Hero</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-alert v-model="showCreationError" color="red" type="error">Creation failed</v-alert>
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
          <v-btn color="red darken-1" text @click="showCreateDialog = false; showCreationError = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="confirmCreate">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog to add an existing team to the organisation -->
    <v-dialog persistent v-model="showAdditionDialog">
      <v-card>
        <v-card-title>Addition of team to organisation {{ getCurrentOrganisation.name || "" }}</v-card-title>
        <v-card-text>
          <v-combobox v-model="heroesToAdd" multiple :items="addableHero" item-text="publicName" label="Select hero"></v-combobox>
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
          <v-btn color="red darken-1" text @click="showDeletionDialog = false; showDeletionError = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="confirmDeletion">Confirm</v-btn>
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
    heroesToAdd: [],
    selectedHero: {},
  }),
  computed: {
    ...mapGetters(["getHeroes", "getCurrentHero", "getCurrentTeam", "getCurrentOrganisation"]),
    headers() {
      let headers = [{text: 'Public Name', value: 'publicName'}, {text: 'Real Name', value: 'realName'}]
      if (this.heroList)
        headers.push({text: 'Actions', value: 'actions', sortable: false})
      return headers
    },
    addableHero() {
      return this.getHeroes.filter(hero => !this.getCurrentTeam.members.some(member => member._id === hero._id));
    },
    members() {
      return this.getCurrentTeam.members || [];
    },
    select: {
      get() {
        return this.getCurrentHero || {};
      },
      set(selectedHero) {
        this.setCurrentHero(selectedHero);
      },
    },
  },
  methods: {
    ...mapActions(["getHeroesData", "setCurrentHero", "createHero", "getOrganisationById", "addTeamToOrganisation", "removeHeroFromTeam", "addHeroToTeam", "setCurrentTeam"]),
    selectHero() {
      // TODO Add popup
    },
    async confirmCreate() {
      const answer = await this.createHero(this.heroCreation);
      if (answer.error === 0) {
        this.heroCreation = { realName: "", publicName: "" };
        this.showCreateDialog = false;
        this.showCreationError = false;

        if (this.heroList) {
          const updatedTeam = await this.addHeroToTeam(answer.data._id);
          this.setCurrentTeam(updatedTeam);
        }
      } else {
        console.log(answer);
        this.showCreationError = true;
      }
    },
    deletionAction(hero) {
      this.heroToDelete = hero;
      this.showDeletionDialog = true;
    },
    async confirmDeletion() {
      console.log(this.heroToDelete);
      const answer = await this.removeHeroFromTeam(this.heroToDelete._id)
      if (answer.error === 0) {
        this.heroToDelete = {}
        const updatedTeam = await this.getOrganisationById()
        this.setCurrentTeam(updatedTeam);
        this.showDeletionDialog = false
        this.showDeletionError = false
      } else {
        console.log(answer)
        this.showDeletionError = true
      }
    },
    async confirmAddition() {
      let anErrorOccurred = false
      let answer = null

      answer = await this.addHeroToTeam(this.heroesToAdd.map(hero => hero._id))
      if (answer.error !== 0) anErrorOccurred = true

      if (!anErrorOccurred) {
        const updatedTeam = await this.getOrganisationById();
        this.setCurrentTeam(updatedTeam.team);
      }

      if (anErrorOccurred)
        this.showAdditionError = true
      else {
        this.heroesToAdd = []
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
