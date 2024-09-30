<template>
    <errors-main-component/>
</template>

<script>
import ErrorsMainComponent from "@/components/ErrorsMainComponent.vue";
export default {
    components: {
        ErrorsMainComponent
    },
    mounted() {
		document.title = 'Ошибки пользователей - beStudy';
    }
}
</script>

<style>

</style>