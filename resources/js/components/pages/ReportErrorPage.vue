<template>
    <report-error-component/>
</template>

<script>
import ReportErrorComponent from "@/components/ReportErrorComponent.vue";
import { mapGetters, mapActions } from 'vuex';
export default {
    components: {
        ReportErrorComponent
    },
    computed: {
    ...mapGetters(['isAuthenticated']),
    },
    mounted() {
		document.title = 'Сообщить об ошибке - beStudy';
    }
}
</script>

<style>

</style>