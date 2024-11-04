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

          <div v-else-if="notification.type === 'internet'">
            <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9995 13.74C11.2195 13.74 10.4795 13.44 9.90946 12.88C9.17946 12.15 8.88946 11.1 9.12946 10.07C9.37946 9.02001 10.2195 8.17999 11.2695 7.92999C12.2895 7.67999 13.3395 7.97002 14.0795 8.71002C14.8195 9.45002 15.0995 10.49 14.8595 11.52C14.6095 12.57 13.7695 13.41 12.7195 13.66C12.4795 13.71 12.2395 13.74 11.9995 13.74ZM11.9995 9.34003C11.8795 9.34003 11.7495 9.36001 11.6295 9.39001C11.1295 9.51001 10.7195 9.91998 10.5995 10.42C10.4695 10.94 10.6095 11.45 10.9795 11.81C11.3495 12.18 11.8495 12.31 12.3795 12.19C12.8795 12.07 13.2895 11.66 13.4095 11.16C13.5395 10.64 13.3995 10.13 13.0295 9.77002C12.7495 9.49002 12.3895 9.34003 11.9995 9.34003Z"/>
            <path d="M6.01996 17.97C5.83996 17.97 5.64995 17.9 5.50995 17.77C3.56995 15.97 2.45996 13.43 2.45996 10.79C2.45996 5.52998 6.73995 1.25 12 1.25C17.26 1.25 21.5399 5.52998 21.5399 10.79C21.5399 13.45 20.47 15.91 18.53 17.74C18.23 18.02 17.75 18.01 17.47 17.71C17.19 17.41 17.2 16.93 17.5 16.65C19.14 15.11 20.0399 13.04 20.0399 10.8C20.0399 6.36999 16.43 2.76001 12 2.76001C7.56995 2.76001 3.95996 6.36999 3.95996 10.8C3.95996 13.06 4.86995 15.14 6.52995 16.68C6.82995 16.96 6.84996 17.44 6.56996 17.74C6.41996 17.89 6.21996 17.97 6.01996 17.97Z"/>
            <path d="M15.9995 15.3C15.8195 15.3 15.6295 15.23 15.4895 15.1C15.1895 14.82 15.1695 14.34 15.4595 14.04C16.2895 13.16 16.7495 12 16.7495 10.8C16.7495 8.18005 14.6195 6.06006 12.0095 6.06006C9.39952 6.06006 7.26953 8.19005 7.26953 10.8C7.26953 12.01 7.72952 13.16 8.55952 14.04C8.83952 14.34 8.82953 14.82 8.52953 15.1C8.22953 15.38 7.74953 15.3701 7.46953 15.0701C6.37953 13.9101 5.76953 12.39 5.76953 10.8C5.76953 7.36005 8.56952 4.56006 12.0095 4.56006C15.4495 4.56006 18.2495 7.36005 18.2495 10.8C18.2495 12.39 17.6495 13.9101 16.5495 15.0701C16.3995 15.2201 16.1995 15.3 15.9995 15.3Z" />
            <path d="M13.4397 22.7501H10.5697C9.42969 22.7501 8.41968 22.1101 7.92968 21.0901C7.43968 20.0701 7.56968 18.8801 8.27968 17.9901L9.71969 16.2001C10.2797 15.5001 11.1097 15.1001 12.0097 15.1001C12.9097 15.1001 13.7397 15.5001 14.2997 16.2001L15.7397 17.9901C16.4497 18.8801 16.5897 20.0701 16.0897 21.0901C15.5797 22.1101 14.5697 22.7501 13.4397 22.7501ZM10.8797 17.1301L9.43969 18.9201C9.08969 19.3601 9.01969 19.9301 9.26969 20.4301C9.50969 20.9401 9.99968 21.2401 10.5597 21.2401H13.4297C13.9897 21.2401 14.4797 20.9401 14.7197 20.4301C14.9597 19.9201 14.8997 19.3601 14.5497 18.9201L13.1097 17.1301C12.5697 16.4501 11.4297 16.4501 10.8797 17.1301Z"/>
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

<style lang="scss">
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
  padding: 11.5px;
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
    fill: #4E6384 !important;
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
