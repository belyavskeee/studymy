<template>
  <transition-group name="slide" tag="div" class="notification-container">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="notification"
      @click="closeNotification(notification.id)"
    >
      <div class="notification-content">
        <div class="icon">
          <!-- Динамическое рендеринг SVG в зависимости от типа уведомления -->
          <div v-if="notification.type === 'error'">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill="#4E6384"/>
              <path d="M9.16937 15.5794C8.97937 15.5794 8.78938 15.5094 8.63938 15.3594C8.34938 15.0694 8.34938 14.5894 8.63938 14.2994L14.2994 8.63938C14.5894 8.34938 15.0694 8.34938 15.3594 8.63938C15.6494 8.92937 15.6494 9.40937 15.3594 9.69937L9.69937 15.3594C9.55937 15.5094 9.35937 15.5794 9.16937 15.5794Z" fill="#4E6384"/>
              <path d="M14.8294 15.5794C14.6394 15.5794 14.4494 15.5094 14.2994 15.3594L8.63938 9.69937C8.34938 9.40937 8.34938 8.92937 8.63938 8.63938C8.92937 8.34938 9.40937 8.34938 9.69937 8.63938L15.3594 14.2994C15.6494 14.5894 15.6494 15.0694 15.3594 15.3594C15.2094 15.5094 15.0194 15.5794 14.8294 15.5794Z" fill="#4E6384"/>
            </svg>
          </div>
          
          <!-- Пример для успешного уведомления -->
          <div v-else-if="notification.type === 'success'">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- SVG для успешного уведомления -->
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.59L5.41 12L6.83 10.59L10 13.76L17.17 6.59L18.59 8L10 16.59Z" fill="#4CAF50"/>
            </svg>
          </div>
          
          <!-- Другие типы SVG можно добавить аналогично -->
        </div>
        <div class="text-content">
          <h4 class="text-default" v-if="notification.title">{{ notification.title }}</h4>
          <p class="text-default">{{ notification.message }}</p>
        </div>
        <button class="close-btn" @click.stop="closeNotification(notification.id)">X</button>
      </div>
    </div>
  </transition-group>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['notifications']) // Получаем уведомления из глобального состояния
  },
  methods: {
    ...mapActions(['removeNotification']),
    closeNotification(id) {
      this.removeNotification(id);
    }
  }
};
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
}

.notification {
  background-color: #e8eff9;
  box-shadow: 0px 10px 10px rgba(78, 99, 132, 0.22);
  color: #4E6384;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  animation: slide-up 0.3s ease-out;
  width: 400px;
}

.notification-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.icon {
  background-color: #dbe6f4;
  width: fit-content;
  height: fit-content;
  padding: 5px;
  border-radius: 10px;
  margin-right: 10px;

  svg {
    vertical-align: middle;
  }
}

.text-content {
  flex-grow: 1;
}

.close-btn {
  background: none;
  border: none;
  color: #4E6384;
  font-size: 20px;
  cursor: pointer;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-leave-active {
  animation: slide-down 0.3s ease-in;
}

@keyframes slide-down {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
}

@media (max-width: 480px) {
  .notification-container {
    width: 100%;
  }

  .notification {
    width: 80%;
  }
}
</style>
