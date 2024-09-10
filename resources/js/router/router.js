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
      next('/login');
      return;
    }

    // Если страница требует определенной роли
    if (to.matched.some(record => record.meta.allowedRoles)) {
      const allowedRoles = to.meta.allowedRoles;

      if (allowedRoles && !allowedRoles.includes(userPermission)) {
        next('/main');
        return;
      }
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Если страница доступна только для гостей (неавторизованных пользователей)
    if (isAuthenticated) {
      next('/'); // перенаправляем авторизованных пользователей на главную страницу или другую
      return;
    }
  }

  next();
});

export default router;