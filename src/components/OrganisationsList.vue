<template>
  <div>
    <h2>List of all organisations</h2>
    <v-card
        class="mx-auto"
        max-width="300">
      <v-card-title class="headline">Organisation name</v-card-title>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, index) in getOrganisations" :key="index" @click="selectOrganisation(item._id)"
                     :class="{'list-item-odd': index % 2 === 0, 'list-item-even': index % 2 !== 0}">
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-card>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: 'OrganisationList',
  data: () => ({
    selectedItem: null
  }),
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