<template>
  <div>
    <h2>List of all teams</h2>
    <v-card
        class="mx-auto"
        max-width="500">
      <v-data-table
          :headers="[{ text: 'Name', value: 'name' }, { text: 'Number of affiliations', value: 'nbAffiliations' }]"
          :items="getTeams"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TeamDetails",
  data: () => ({}),
  computed: {
    ...mapGetters(['getTeams'])
  },
  methods: {
    ...mapActions(['getTeamsData']),
    selectTeam(id) {
      this.$router.push({name: 'teamDetails', params: {id: id}})
    }
  },
  async mounted() {
    await this.getTeamsData()
    console.log(this.getTeams)
  }
}
</script>