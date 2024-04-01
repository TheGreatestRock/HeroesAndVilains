<template>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
        <authComponent></authComponent>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'AuthenticationView',
    components: {
        authComponent: () => import('@/components/AuthComponent.vue'),
    },
    methods: {
        ...mapActions(['login']),
    },
};
</script>

<style>

</style>