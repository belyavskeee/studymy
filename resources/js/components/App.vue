<template>
  <!-- <preloader v-if="isLoading" /> -->
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
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isLoading: true,
      connectionType: null,
      effectiveType: null,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  mounted() {
    // Проверяем подключение при загрузке
    this.checkConnection();

    // Следим за изменениями в состоянии сети
    if (navigator.connection) {
      navigator.connection.addEventListener('change', this.checkConnection);
    }

    // window.addEventListener('load', () => {
    //   this.isLoading = false;
    // });
  },
  methods: {
    checkConnection() {
      if (navigator.connection) {
        this.connectionType = navigator.connection.type;
        this.effectiveType = navigator.connection.effectiveType;

        // Если скорость соединения плохая
        if (this.effectiveType === '2g' || this.effectiveType === 'slow-2g') {
          this.$store.dispatch('addNotification', {
            title: 'Бип-бип, мы в пробке',
            message: 'Низкая скорость интернета',
            icon: 'fas fa-exclamation-triangle',
            type: 'internet',
            timeout: 30000,
          });
        }

        // Если соединения вообще нет
        if (!navigator.onLine) {
          this.$store.dispatch('addNotification', {
            title: 'Космическая помеха',
            message: 'Кажется у вас нет интернета',
            icon: 'fas fa-exclamation-triangle',
            type: 'internet',
            timeout: 30000,
          });
        }
      }
    },
  },
  beforeDestroy() {
    if (navigator.connection) {
      navigator.connection.removeEventListener('change', this.checkConnection);
    }
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
