<template>
  <div>
    <h2>List of all teams</h2>
    <v-card
        class="mx-auto"
        max-width="300">
      <v-card-title class="headline">Organisation name</v-card-title>
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, index) in getTeams" :key="index" @click="selectTeam(item._id)"
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