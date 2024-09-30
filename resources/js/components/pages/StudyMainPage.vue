<template>
    <study-main-component/>
</template>

<script>
import StudyMainComponent from "@/components/StudyMainComponent.vue";
export default {
    components: {
        StudyMainComponent,
    },
    mounted() {
		document.title = 'Образование - beStudy';
    }
}
</script>

<style>

</style>