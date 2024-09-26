<template>
    <preloader v-if="isLoading"/>
    <my-notification ref="notificationComponent" />
    <router-view />
</template>

<script>
export default {
  data() {
    return {
      isLoading: true, // по умолчанию показываем лоадер
    };
  },
  mounted() {
    // Отлавливаем событие загрузки страницы
    window.addEventListener('load', () => {
      this.isLoading = false; // Скрываем лоадер после полной загрузки
    });
  },
};
</script>

<style>

</style>
