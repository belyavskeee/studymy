<template>
    <!-- <big-loader/> -->
    <auth-register/>
</template>

<script>
import AuthRegister from "@/components/AuthRegister.vue";
export default {
    components: {
        AuthRegister
    },
    mounted() {
		document.title = 'Авторизация - beStudy';
    }
}

</script>

<style>

</style>