<template>
  <div>
    <h2>List of all organisations</h2>
    <v-btn @click="createOrganisation" color="primary">Create new Organisation</v-btn>
    <v-btn @click="selectOrganisation" color="primary">Modify</v-btn>
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
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: 'OrganisationList',
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapGetters(['getOrganisations', 'getCurrentOrganisation']),
    selected: {
      get() {
        return [this.getCurrentOrganisation]
      },
      set(selectedOrganisations) {
        this.setCurrentOrganisation(selectedOrganisations[0])
      }
    }
  },
  methods: {
    ...mapActions(['getOrganisationsData', 'setCurrentOrganisation']),
    selectOrganisation() {
      this.$router.push({name: 'organisationDetails'})
    },
    createOrganisation() {

    }
  },
  async mounted() {
    await this.getOrganisationsData()
  }
}
</script>