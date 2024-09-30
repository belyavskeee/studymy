<template>
    <subject-component/>
</template>

<script>
import SubjectComponent from "@/components/SubjectComponent.vue";
export default {
    components: {
        SubjectComponent,
    },
    mounted() {
		document.title = 'Предмет - beStudy';
    }
}
</script>

<style>

</style>