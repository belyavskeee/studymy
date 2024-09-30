<template>
    <create-timetable-component/>
</template>

<script>
import CreateTimetableComponent from "@/components/CreateTimetableComponent.vue";

export default {
    components: {
        CreateTimetableComponent,
    },
    mounted() {
		document.title = 'Создание расписания - beStudy';
    }
}
</script>

<style>

</style>