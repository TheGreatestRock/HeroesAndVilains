<template>
  <div>
    <h2>List of all organisations</h2>
    <v-card
        class="mx-auto"
        max-width="500">
      <v-data-table
          :headers="[{ text: 'Name', value: 'name' }]"
          :items="getOrganisations"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: 'OrganisationList',
  data: () => ({}),
  computed: {
    ...mapGetters(['getOrganisations'])
  },
  methods: {
    ...mapActions(['getOrganisationsData']),
    selectOrganisation(id) {
      this.$router.push({name: 'organisationDetails', params: {id: id}})
    }
  },
  async mounted() {
    await this.getOrganisationsData()
  }
}
</script>

<style>
.list-item-odd {
  background-color: #f5f5f5; /* Light grey background */
}

.list-item-even {
  background-color: #ffffff; /* White background */
}
</style>