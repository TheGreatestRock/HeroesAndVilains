<template>
  <div>
    <v-container v-if="!isVisible">
      <v-row>
        <v-col style="">
          name : <br>
          <p class="text-h4">{{ getCurrentOrganisation.name }}</p><br>
          <!--          {{ getCurrentOrganisation }} <br>-->
          <div v-if="getCurrentOrganisation.secret">
            password:
            <p class="text-h6">{{ getCurrentOrganisation.secret }}</p>
            <TeamsList
                v-if="getCurrentOrganisation.secret"
                :teamList="getCurrentOrganisation.teams || []"/>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="isVisible" persistent max-width="300px">
      <v-card>
        <v-card-title class="text-h5">Error</v-card-title>
        <v-card-text>No organisation is currently selected</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="alertClosed">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="showLoginDialog"
        persistent>
      <v-card>
        <v-card-title>Login to organisation {{
            getCurrentOrganisation ? getCurrentOrganisation.name : ''
          }}
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
import TeamsList from "@/components/TeamsList";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "OrganisationDetails",
  components: {
    TeamsList
  },
  data: () => ({
    showLoginError: false,
    password: '',
  }),
  computed: {
    ...mapGetters(['getCurrentOrganisation', 'getOrganisationsPassword']),
    isVisible() {
      return !this.getCurrentOrganisation
    },
    showLoginDialog() {
      return !this.isVisible && !this.getCurrentOrganisation.secret
    }
  },
  methods: {
    ...mapActions(['setOrganisationsPassword', 'getOrganisationById']),
    alertClosed() {
      this.$router.push({name: 'organisationsList'})
    },
    async connect() {
      await this.setOrganisationsPassword(this.password);
      const answer = await this.getOrganisationById()
      console.log(answer)
      if (answer.error === 0) {
        this.showLoginError = false
        this.showLoginError = false
      } else
        this.showLoginError = true
    },
    cancelLogin() {
      this.$router.push({name: 'organisationsList'})
    }
  },
  mounted() {
    this.password = ''
    this.showLoginError = false
  }
}
</script>