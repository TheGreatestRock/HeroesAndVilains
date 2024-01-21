<template>
  <dib>

  </dib>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'OrganisationList',
  data: () => ({}),
  computed: {
    ...mapState('organisations', ['organisationsNames'])
  },
  methods: {
    ...mapActions('organisations', ['getOrganisations'])
  },
  mounted() {

  }
}
</script>