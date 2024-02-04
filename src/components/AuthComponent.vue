<template>
    <div>
        <v-text-field
            label="Password"
            v-model="password"
        ></v-text-field>
        <v-btn style="color: blue;" @click="connect()">Connexion</v-btn>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
    data() {
        return {
            password:  (this.getOrganisationsPassword) ? this.getOrganisationsPassword : '',
        };
    },
    computed: {
        ...mapGetters(['getOrganisationsPassword']),
    },
    methods: {
        ...mapActions(['setOrganisationsPassword']),
        connect() {
            this.setOrganisationsPassword(this.password);
            this.$router.push({name: 'home'});
        }
    },
};
</script>
