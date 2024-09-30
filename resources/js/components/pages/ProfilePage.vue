<template>
    <profile-component/>
</template>

<script>
import ProfileComponent from "@/components/ProfileComponent.vue";
export default {
    components: {
        ProfileComponent 
    },
    mounted() {
		document.title = 'Мой аккаунт - beStudy';
    }
}

</script>

<style>

</style>