<template>
    <div>
        <v-text-field clearable label="Password" style="width: 300px" v-model="password"></v-text-field>
        <v-btn style="color: blue;" @click="connect()">Connexion</v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: '',
        };
    },
    computed: {
    },
    methods: {
        connect() {
            window.alert(this.password)
        }
    },
};
</script>
