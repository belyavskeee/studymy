<template>
  <div class="auth-block">
    <div class="auth-block-text">
      <h4>Электронный информационный ресурс для учреждений образования</h4>
      <p>beStudy™</p>
    </div>
    <div class="block-registration">
      <img :src="pictureAuth" data-aos="fade-down" data-aos-duration="2500" alt="svg картинка">

      <div class="form-auth">
        <div class="swiper swiper-auth">
          <div class="image-slider__wrapper swiper-wrapper">
            <!-- Вход -->
            <div class="swiper-slide">
              <form class="form-input auth-slide" @submit.prevent="loginUser">
                <input type="text" v-model="loginData.login" name="login" placeholder="Логин" :class="{'error': loginError}"><br>
                <input type="password" v-model="loginData.password" name="password" placeholder="Пароль" :class="{'error': loginError}"><br>
                
                <!-- Кнопка входа с динамическим отображением текста и спиннера -->
                <button class="form-button-go" type="submit" :disabled="loading">
                  <span v-if="!loading">Войти</span>
                  <span v-if="loading" class="spinner"></span>
                </button>
                
                <br>
                <input @click="swiper.slideNext()" class="form-button-reg btn-next" type="button" value="Регистрация">
                <a href="https://t.me/matve_blvsk" class="a-href">Забыли пароль?</a>
              </form>
            </div>

            <!-- Код регистрации -->
            <div class="swiper-slide">
              <form class="form-input auth-slide" @submit.prevent="registerCodUser">
                <input type="text" v-model="registerCodData.user_password" name="user_password" placeholder="Введите код" required><br>
                <a href="#" style="margin: 20px 15px 0 15px;">Регистрируясь, вы соглашаетесь с условиями Пользовательского соглашения и Политики конфиденциальности</a>
                
                <!-- Кнопка регистрации с кодом -->
                <button class="form-button-go" type="submit" :disabled="loading">
                  <span v-if="!loading">Регистрация</span>
                  <span v-if="loading" class="spinner"></span>
                </button>
                
                <br>
                <input @click="swiper.slidePrev()" class="form-button-reg btn-prev" type="button" value="У меня есть аккаунт">
              </form>
            </div>

            <!-- Полная регистрация -->
            <div class="swiper-slide">
              <form class="form-input auth-slide" @submit.prevent="registerUser">
                <a href="#" style="margin: 20px 15px 0 15px;">Придумайте логин и пароль</a>
                <input type="text" v-model="registerData.login" name="login" placeholder="Логин" :class="{'error': registerError}"><br>
                <input type="password" v-model="registerData.password" name="password" placeholder="Пароль" :class="{'error': registerError}"><br>
                
                <!-- Кнопка полной регистрации -->
                <button class="form-button-go" type="submit" :disabled="loading">
                  <span v-if="!loading">Регистрация</span>
                  <span v-if="loading" class="spinner"></span>
                </button>
                
                <br>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pictureAuth from '/resources/assets/images/1.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swiper from 'swiper';
import 'swiper/css';
import axios from 'axios';

export default {
  data() {
    return {
      swiper: null,
      pictureAuth,
      loginData: {
        login: '',
        password: ''
      },
      registerCodData: {
        user_password: ''
      },
      registerData: {
        login: '',
        password: ''
      },
      loginError: '',
      registerError: '',
      loading: false, // Для отслеживания состояния загрузки
      loginAttempts: 0, // Количество попыток входа
      codAttempts: 0, // Количество попыток ввода кода
      registerAttempts: 0 // Количество попыток регистрации
    };
  },
  methods: {
    validateLogin() {
      this.loginError = '';
      if (!this.loginData.login) {
        this.$store.dispatch('addNotification', {
          title: 'Упс...',
          message: 'Тут нужен логин!',
          type: 'error',
          timeout: 15000
        });
        return false;
      }
      if (!this.loginData.password) {
        this.$store.dispatch('addNotification', {
          title: 'Упс...',
          message: 'Тут нужен пароль!',
          type: 'error',
          timeout: 15000
        });
        return false;
      }
      return true;
    },
    loginUser() {
      if (!this.validateLogin()) return;

      this.loading = true; // Включаем режим загрузки
      this.loginAttempts++;

      const delay = Math.min(this.loginAttempts * 250, 15000);

      setTimeout(() => {
        this.$store.dispatch('login', this.loginData)
          .then(() => {
            // this.$router.push('/main');
          })
          .catch(error => {
            this.$store.dispatch('addNotification', {
              title: 'Упс...',
              message: 'Неправильный логин или пароль!',
              type: 'error',
              timeout: 15000
            });
          })
          .finally(() => {
            this.loading = false; // Выключаем режим загрузки    
          });
      }, delay);
    },
    validateRegisterCod() {
      if (!this.registerCodData.user_password) {
        this.$store.dispatch('addNotification', {
          title: 'Упс...',
          message: 'Нужен одноразовый код!',
          type: 'error',
          timeout: 15000
        });
        return false;
      }
      return true;
    },
    registerCodUser() {
      if (!this.validateRegisterCod()) return;

      this.loading = true; // Включаем режим загрузки
      this.codAttempts++;

      const delay = Math.min(this.codAttempts * 250, 15000);

      setTimeout(() => {
        axios.post('/api/check-user-password', this.registerCodData)
          .then(() => {
            this.swiper.slideNext();
          })
          .catch(() => {
            this.$store.dispatch('addNotification', {
              title: 'Упс...',
              message: 'Неправильный одноразовый код!',
              type: 'error',
              timeout: 15000
            });
          })
          .finally(() => {
            this.loading = false; // Выключаем режим загрузки
          });
      }, delay);
    },
    validateRegister() {
      if (!this.registerData.login) {
        this.$store.dispatch('addNotification', {
          title: 'Упс...',
          message: 'Необходим логин!',
          type: 'error',
          timeout: 15000
        });
        return false;
      }
      if (!this.registerData.password) {
        this.$store.dispatch('addNotification', {
          title: 'Упс...',
          message: 'Тут нужен пароль!',
          type: 'error',
          timeout: 15000
        });
        return false;
      }
      return true;
    },
    registerUser() {
      if (!this.validateRegister()) return;

      const registerData = {
        login: this.registerData.login,
        password: this.registerData.password,
        user_password: this.registerCodData.user_password
      };

      this.loading = true; // Включаем режим загрузки
      this.registerAttempts++;

      const delay = Math.min(this.registerAttempts * 250, 15000);

      setTimeout(() => {
        axios.post('/api/update-user', registerData)
          .then(() => {
            this.loginData.login = this.registerData.login;
            this.loginData.password = this.registerData.password;
            this.loginUser(); // После успешной регистрации логинимся
          })
          .catch(() => {
            this.$store.dispatch('addNotification', {
              title: 'Упс...',
              message: 'Непредвиденная ошибка регистрации!',
              type: 'error',
              timeout: 15000
            });
          })
          .finally(() => {
            this.loading = false; // Выключаем режим загрузки
          });
      }, delay);
    }
  },
  mounted() {
    AOS.init();
    this.swiper = new Swiper('.swiper-auth', {
      loop: false,
      allowTouchMove: false,
      spaceBetween: 0
    });
  }
};
</script>

<style>
  .spinner {
    display: block;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-left: 3px solid white;
    border-bottom: 3px solid white;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin: 0 auto;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
