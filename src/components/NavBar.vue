<template>
    <div>
      <v-app-bar app>
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Heroes&Villains</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="toggleAuthentication">s'authentifier</v-btn>
      </v-app-bar>
  
      <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item
            v-for="route in routes"
            :key="route.name"
            @click="navigate(route.path)"
            :class="{ 'v-list-item-hover': route.hover }"
          >
            <v-list-item-icon>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ route.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: false,
        routes: [
          { name: 'Home', path: '/', icon: 'mdi-home'},
          { name: 'Organisations', path: '/organisations', icon: 'mdi-domain', children: [
            { name: 'Org1', path: '/organisations/org1' },
            { name: 'Org2', path: '/organisations/org2' },
          ]},
          { name: 'Teams', path: '/teams', icon: 'mdi-account-group', children: [
            { name: 'Team1', path: '/teams/team1' },
            { name: 'Team2', path: '/teams/team2' },
          ]},
        ],
      };
    },
    methods: {
      toggleDrawer() {
        this.drawer = !this.drawer;
      },
      toggleAuthentication() { 
        var audio = new Audio(require('@/assets/pouet.mp3'))
        audio.play()     
        window.alert("pouet")
      },
      navigate(path) {
        if (this.$route.path !== path) {
          this.$router.push(path);
        }
        this.toggleDrawer();
      },
    },
  };
  </script>
  
  <style scoped>
  .v-list-item-hover:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  </style>
  