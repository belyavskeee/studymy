import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import store from '../store/store';  

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active-link',
  routes,
});

router.beforeEach((to, from, next) => {

  const isAuthenticated = store.getters.isAuthenticated;
  const userPermission = store.getters.userPermission;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Если страница требует авторизации
    if (!isAuthenticated) {
      store.dispatch('addNotification', {
        title: 'Упс...',
        message: 'Вам нужно войти в систему',
        type: 'error',
        timeout: 5000,
      });
      next('/login');
      return;
    }

    // Если страница требует определенной роли
    if (to.matched.some(record => record.meta.allowedRoles)) {
      const allowedRoles = to.meta.allowedRoles;

      if (allowedRoles && !allowedRoles.includes(userPermission)) {
        store.dispatch('addNotification', {
          title: 'Упс...',
          message: 'Кажется вам туда нельзя.',
          type: 'error',
          timeout: 5000,
        });
        next('/');
        return;
      }
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Если страница доступна только для гостей (неавторизованных пользователей)
    if (isAuthenticated) {
      // Убираем обращение к this, используем store напрямую
      store.dispatch('addNotification', {
        title: 'Упс...',
        message: 'Вы уже авторизованы',
        icon: 'fas fa-exclamation-triangle',
        type: 'error',
        timeout: 5000,
      });
      next('/'); // перенаправляем авторизованных пользователей на главную страницу или другую
      return;
    }
  }

  next();
});

export default router;
