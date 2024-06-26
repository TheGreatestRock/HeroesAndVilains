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
          :items="members"
          :single-select="true"
          :search="search"
          item-key="_id"
          show-select
          class="elevation-1"
      >
        <template slot="item.actions" slot-scope="{ item }">
          <v-icon
              small
              @click="deletionAction(item)"
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
              v-model="heroesToAdd"
              multiple
              :items="addableHero"
              item-text="publicName"
              label="Select hero"
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

    <!--dialog to modify hero-->
    <v-dialog persistent v-model="showModifyDialog">
      <v-card>
        <v-card-title>Modify Hero</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field label="Real Name" v-model="modifiedHero.realName"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field label="Hero Name" v-model="modifiedHero.publicName"></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="showModifyDialog = false; modifiedHero = {}">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="confirmModify">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
    showModifyDialog: false,
    modifiedHero: {},
    heroCreation: { realName: "", publicName: "" },
    heroToDelete: {},
    heroesToAdd: [],
  }),
  computed: {
    ...mapGetters(["getHeroes", "getCurrentHero", "getCurrentTeam", "getCurrentOrganisation"]),
    headers() {
      let headers = [{ text: 'Public Name', value: 'publicName' }, { text: 'Real Name', value: 'realName' }]
      if (this.heroList)
        headers.push({ text: 'Actions', value: 'actions', sortable: false })
      return headers
    },
    selected: {
      get() {
        return this.getCurrentHero;
      },
      set(selectedHeroes) {
        this.setCurrentHero(selectedHeroes[0]);
      },
    },
    addableHero() {
      return this.getHeroes.filter(hero => {
        return !this.members.some(member => member._id === hero._id);
      });
    },
    members() {
      return this.getCurrentTeam.members
    }
  },
  methods: {
    ...mapActions(["getHeroesData", "setCurrentHero", "createHero", "getOrganisationById", "addTeamToOrganisation", "removeHeroFromTeam", "addHeroToTeam", "updateHero"]),
    selectHero() {
      if (this.getCurrentHero) {
        this.modifiedHero = this.getCurrentHero;
        this.showModifyDialog = true;
      }
    },
    async confirmCreate() {
      const answer = await this.createHero(this.heroCreation);
      if (answer.error === 0) {
        this.heroCreation = { realName: "", publicName: "" };
        this.showCreateDialog = false;
        this.showCreationError = false;
        if (this.heroList) {
          await this.addHeroToTeam(answer.data._id);
        }
        await this.getOrganisationById();
      } else {
        console.log(answer);
        this.$emit('error', 'Error creating hero');
      }
    },
    deletionAction(hero) {
      console.log('hero', hero);
      this.heroToDelete = hero;
      this.showDeletionDialog = true;
    },
    async confirmDeletion() {
      console.log('g', this.heroToDelete);
      const answer = await this.removeHeroFromTeam(this.heroToDelete);
      if (answer.error === 0) {
        console.log('a',answer);
        this.heroToDelete = {};
        console.log('f',this.heroToDelete);
        this.showDeletionDialog = false;
        console.log('b',this.showDeletionDialog);
        this.showDeletionError = false;
        console.log('f',this.showDeletionError);
        await this.getOrganisationById();
      } else {
        console.log(answer);
        this.$emit('error', 'Error deleting hero');
      }
    },
    async confirmAddition() {
      let anErrorOccurred = false;
      const answer = await this.addHeroToTeam(this.heroesToAdd.map(hero => hero._id));
      if (answer.error !== 0) anErrorOccurred = true;
      await this.getOrganisationById();
      if (anErrorOccurred) {
        this.$emit('error', 'Error adding hero');
      } else {
        this.heroesToAdd = [];
        this.showAdditionError = false;
        this.showAdditionDialog = false;
      } 
    },
    async confirmModify() {
      const answer = await this.updateHero(this.modifiedHero);
      if (answer.error === 0) {
        this.modifiedHero = {};
        this.showModifyDialog = false;
        this.showCreationError = false;
        await this.getOrganisationById();
      } else {
        console.log(answer);
        this.$emit('error', 'Error modifying hero');
      }
    },
    modifyAction(hero) {
      this.modifiedHero = hero;
      this.showModifyDialog = true;
    },
  },
  async mounted() {
    await this.getHeroesData();
  },

};
</script>
