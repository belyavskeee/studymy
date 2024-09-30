<template>
    <menu-inline :options="valueMenu" :title="title"/>
</template>

<script>
import MenuInline from "@/components/UI/MenuInline.vue";

export default {
  components: {
    MenuInline
  },
  data() {
    return {
      valueMenu: [
        { header: 'НГАЭК', value: 'Новопольский государственный аграрно-экономический колледж', path: '/groups/study-groups' },
      ],
      title: 'Учебные заведения',
    };
  },
  mounted() {
		document.title = 'Учебные заведения - beStudy';
  }
}  
</script>

<style>

</style>