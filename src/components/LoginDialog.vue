<template>
  <div>
    <v-dialog
        v-model="showLoginDialog"
        persistent>
      <v-card>
        <v-card-title>
          Login to organisation {{ getCurrentOrganisation ? getCurrentOrganisation.name : '' }}
        </v-card-title>
        <v-card-text>
          <v-alert
              v-model="showLoginError"
              color="red"
              type="error"
          >
            Wrong password
          </v-alert>
          <v-text-field
              label="Password"
              v-model="password"
              @keydown.enter="connect()"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
              color="red darken-1"
              text
              @click="cancelLogin()"
          >
            Cancel
          </v-btn>
          <v-btn
              style="color: blue;"
              @click="connect()">
            Connexion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "LoginDialog",
  data: () => ({
    showLoginError: false,
    password: ''
  }),
  computed: {
    ...mapGetters(['getCurrentOrganisation']),
    showLoginDialog() {
      return !!this.getCurrentOrganisation && !this.getCurrentOrganisation.secret
    }
  },
  methods: {
    ...mapActions(['setOrganisationsPassword', 'getOrganisationById']),
    async connect() {
      await this.setOrganisationsPassword(this.password);
      const answer = await this.getOrganisationById();
      if (answer.error === 0) {
        this.showLoginError = false;
        this.showLoginError = false;
      } else {
        this.showLoginError = true;
        this.$emit('login-error', 'Wrong password');
      }
    },
    cancelLogin() {
      this.$router.push({name: 'organisationsList'})
    },
    mounted() {
      this.password = '';
      this.showLoginError = false;
    }
  }
}
</script>
