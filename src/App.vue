<template>
    <v-app>
      <v-app-bar app>
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Heroes&Villains</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="toggleAuthentication">s'authentifier</v-btn>
      </v-app-bar>
  
      <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item v-for="route in routes" :key="route.name" @click="navigate(route.path)">
            <v-list-item-icon>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ route.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: false,
        routes: [
          { name: 'Home', path: '/', icon: 'mdi-home' },
          { name: 'Organisations', path: '/organisations'},
          { name: 'Teams', path: '/teams'},
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
  