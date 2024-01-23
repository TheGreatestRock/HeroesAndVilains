<template>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
        <authComponent></authComponent>
    </div>
</template>

<script>
import authComponent from "../components/AuthComponent.vue"
export default {
    name: "AuthentificationView",
    components: {
        authComponent
    }
}
</script>

<style>

</style>