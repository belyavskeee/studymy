<template>
  <my-notification ref="notificationComponent" />
  <my-header v-if="isAuthenticated" />

  <transition name="slide" mode="out-in">
    <router-view :key="$route.fullPath" />
  </transition>
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
            title: 'Космическая помеха!',
            message: 'Кажется у вас нет интернета',
            icon: 'fas fa-exclamation-triangle',
            type: 'internet',
            timeout: 'none'
          });

          window.addEventListener('online', this.removeInternetNotification);
        }
      }
    },
    removeInternetNotification() {
      // Удаляем уведомление с типом 'internet'
      this.$store.dispatch('removeNotification', { type: 'internet' });
      window.removeEventListener('online', this.removeInternetNotification);
    }
  },
  beforeDestroy() {
    if (navigator.connection) {
      navigator.connection.removeEventListener('change', this.checkConnection);
    }
  },
};
</script>


<style>
/* Анимация смены страниц */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.15s ease-in-out, opacity 0.15s;
}

.slide-enter-from {
  transform: translateY(10px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
