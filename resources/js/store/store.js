import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router/router';

const store = createStore({
  state() {
    return {
      user: null,
      token: localStorage.getItem('token') || null,
      userFullName: null,
      userPermission: null,
      userGroup: null,
      userGroupId: null,
      userId: null,
      notifications: [] // Добавляем состояние для уведомлений
    };
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData.user;
      state.userFullName = `${userData.user.lastName} ${userData.user.firstName} ${userData.user.middleName}`;
      state.userPermission = userData.user.permission;
      state.userGroup = userData.user.group;
      state.userGroupId = userData.user.group_id;
      state.userId = userData.user.id;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearAuthData(state) {
      state.user = null;
      state.token = null;
      state.userFullName = null;
      state.userPermission = null;
      state.userGroup = null;
      state.userGroupId = null;
      state.userId = null;
    },
    // Мутации для управления уведомлениями
    addNotification(state, notification) {
      if (state.notifications.length >= 4) {
        state.notifications.shift(); // Убираем старые уведомления, если их больше 3
      }
      state.notifications.push(notification);
    },
    removeNotification(state, id) {
      state.notifications = state.notifications.filter(notif => notif.id !== id);
    },
    clearNotifications(state) {
      state.notifications = [];
    }
  },
  actions: {
    async login({ commit }, authData) {
      try {
        const response = await axios.post('/api/login', authData);
        const data = response.data;
        commit('setUser', data);
        commit('setToken', data.token);

        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        router.push('/profile');
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async logout({ commit }) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        await axios.post('/api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        commit('clearAuthData');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/');
      } catch (error) {
        console.error('Logout failed:', error);
        throw error;
      }
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      commit('setToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/user')
        .then(response => {
          commit('setUser', response.data);
        })
        .catch(error => {
          console.error('Failed to fetch user:', error);
          commit('clearAuthData');
        });
    },
    // Действия для управления уведомлениями
    addNotification({ commit }, notification) {
      const id = Date.now();
      const timeout = notification.timeout || 5000; // По умолчанию 5 секунд
      commit('addNotification', { id, ...notification });

      // Автоматическое удаление уведомления через timeout
      setTimeout(() => {
        commit('removeNotification', id);
      }, timeout);
    },
    removeNotification({ commit }, id) {
      commit('removeNotification', id);
    },
    clearNotifications({ commit }) {
      commit('clearNotifications');
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    userFullName: state => state.userFullName,
    userPermission: state => state.userPermission,
    userGroup: state => state.userGroup,
    userGroupId: state => state.userGroupId,
    userId: state => state.userId,
    notifications: state => state.notifications // Геттер для уведомлений
  }
});

// Вызываем действие autoLogin при создании хранилища Vuex
store.dispatch('autoLogin');

export default store;
