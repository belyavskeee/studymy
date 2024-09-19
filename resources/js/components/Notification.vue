<template>
    <transition-group name="slide" tag="div" class="notification-container">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        @click="closeNotification(notification.id)"
      >
        <div class="notification-content">
          <!-- Используйте динамический класс для иконки в зависимости от типа уведомления -->
          <!-- <i class="notification-icon material-icons-round" :style="{ color: '#4E6384', fontSize: '24px', borderRadius: '50%', padding: '8px' }">error</i> -->
          <!-- <span class="material-icons-round">
error
</span> -->
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
  export default {
    data() {
      return {
        notifications: []
      };
    },
    methods: {
      getIconClass(type) {
        switch(type) {
          case 'info':
            return 'material-icons info-icon'; // Пример для информационной иконки
          case 'success':
            return 'material-icons success-icon'; // Пример для успешной иконки
          case 'error':
            return 'material-icons error-icon'; // Пример для иконки ошибки
          default:
            return 'material-icons';
        }
      },
      addNotification(notification) {
        if (this.notifications.length >= 3) {
          this.notifications.shift(); // Удаляем самое старое уведомление
        }
        const id = Date.now();
        this.notifications.push({
          id,
          icon: this.getIconClass(notification.type), // Устанавливаем класс иконки в зависимости от типа
          ...notification
        });
        setTimeout(() => {
          this.closeNotification(id);
        }, 10000); // Удалить уведомление через 10 секунд
      },
      closeNotification(id) {
        this.notifications = this.notifications.filter(notif => notif.id !== id);
      }
    }
  };
  </script>
  
  <style scoped>
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
    color: #4E6384;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 30px;
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
  
  .notification-icon {
    width: 36px; /* Измените размер иконки здесь */
    height: 36px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border-radius: 50%;
    background-color: #fff; /* Белый фон для иконки */
  }
  
  .text-content {
    flex-grow: 1;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: #4E6384;
    font-size: 18px;
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
  </style>
  