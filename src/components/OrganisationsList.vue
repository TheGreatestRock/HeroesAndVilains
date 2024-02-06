<template>
  <div>
    <h2>List of all organisations</h2>
    <v-btn @click="showCreateOrganisation" color="primary">Create new Organisation</v-btn>
    <v-btn @click="selectOrganisation" color="primary">View</v-btn>
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
          :headers="[{ text: 'Name', value: 'name' }]"
          :items="getOrganisations"
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
        <v-card-title class="text-h5">Create a new organisation</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-alert
                  v-model="showCreationError"
                  color="red"
                  type="error"
              >
                Creation failed
              </v-alert>
            </v-row>
            <v-row>
              <v-text-field
                  label="Organisation's name"
                  v-model="organisationCreation.name"
              />
            </v-row>
            <v-row>
              <v-text-field
                  label="Organisation's secret"
                  v-model="organisationCreation.secret"
              />
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
  name: 'OrganisationList',
  data: () => ({
    search: '',
    showCreateDialog: false,
    showCreationError: false,
    organisationCreation: {name: '', secret: ''}
  }),
  computed: {
    ...mapGetters(['getOrganisations', 'getCurrentOrganisation']),
    selected: {
      get() {
        return [this.getCurrentOrganisation]
      },
      set(selectedOrganisations) {
        this.$store.commit('updateCurrentOrganisation', (selectedOrganisations[0]))
      }
    }
  },
  methods: {
    ...mapActions(['getOrganisationsData', 'createOrganisation']),
    selectOrganisation() {
      this.$router.push({name: 'currentOrganisationDetails'})
    },
    showCreateOrganisation() {
      this.showCreateDialog = true
    },
    async confirmCreate() {
      const answer = await this.createOrganisation(this.organisationCreation)
      if (answer.error === 0) {
        this.organisationCreation = {name: '', secret: ''}
        await this.getOrganisationsData()
        this.showCreateDialog = false
      } else {
        console.log(answer)
        this.showCreationError = true
      }
    }
  },
  async mounted() {
    await this.getOrganisationsData()
  }
}
</script>