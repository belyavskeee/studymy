<template>
  <preloader v-if="isLoading" />
  <my-notification ref="notificationComponent" />
  <my-header v-if="isAuthenticated" />
  <!-- <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view> -->
  <router-view/>
  <my-footer/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      isLoading: true, // по умолчанию показываем лоадер
    };
  },
    computed: {
    ...mapGetters(['isAuthenticated']),
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
