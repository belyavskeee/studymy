<template>
    <my-header v-if="isAuthenticated"></my-header>
    <div class="auth-block main-block">
        <div class="more-info item-settings-list">
            <h3>Добавить заведение к системе</h3>
            <p>3</p>
            <div class="item-big-button-arrow-block more-info-arrow">
            <div class="item-big-button-arrow">
              <div class="arrow-background"></div> <!-- Добавляем элемент фона -->
              <svg viewBox="0 0 90 62" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.000411987 30.9998C0.000411987 32.5536 0.432236 33.8112 1.87204 35.2911L25.3382 60.2979C26.4181 61.4078 27.6417 62 29.1534 62C32.1048 62 34.1921 59.7063 34.1921 56.6727C34.1921 55.1929 33.6165 53.6391 32.4648 52.6037L20.8757 41.4321L17.6307 38.2379C16.9764 37.5939 17.4631 36.4824 18.3801 36.5264L26.5625 36.9187L83.5003 36.9187C86.5236 36.9187 89.043 34.1812 89.043 30.9998C89.043 27.8185 86.5236 25.1549 83.5003 25.1549L26.5625 25.1549L18.3545 25.4923C17.4406 25.5298 16.9601 24.422 17.612 23.7804L20.8757 20.5682L32.4648 9.39595C33.6165 8.28668 34.1921 6.7327 34.1921 5.25296C34.1921 2.21955 32.1048 0 29.1534 0C27.6417 0 26.4181 0.591885 25.3382 1.70166L1.87204 26.7086C0.432236 28.1885 0.000411987 29.52 0.000411987 30.9998Z"/>
              </svg>
            </div>
          </div>
        </div>
        <div>
            <big-block-button-img :options="valueButtons"/>
        </div>
    </div>
    <my-footer/>
</template>

<script>
import BigBlockButtonImg from "@/components/ui/BigBlockButtonImg.vue";
import RotatingText from '@/components/ui/RotatingText.vue';
import { bottom, right } from "@popperjs/core";
import { mapGetters, mapActions } from 'vuex';
export default {
    components: {
        BigBlockButtonImg,
        RotatingText
    },
    data() {
        return {
            valueButtons: [
            { 
                header: 'QR-коды',
                description: 'Узнать поробнее об системе',
                path: '/login',
                image: '/resources/assets/images/qr_kode_scan.jpg'
            },
            { 
                header: 'Распознавание лиц',
                description: 'Прочитать подробнее',
                path: '/institutions',
                image: '/resources/assets/images/qr_kode_scan.jpg'
            }
        ],
        title: ''
        };
    },
    computed: {
    ...mapGetters(['isAuthenticated']),
    },
    async mounted() {
        document.title = 'Главная - beStudy';
        try {
            const data = await fetchData();
            this.options = data;
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            // Вместо обращения к $refs, вызываем экшен через store
            this.$store.dispatch('addNotification', {
                title: 'Ошибка',
                message: 'Ошибка загрузки данных!',
                icon: 'fas fa-exclamation-triangle',
                type: 'error',
                timeout: 50000
            });
        }
    },

    methods: {
        showErrorNotification() {
            this.$store.dispatch('addNotification', {
                title: 'Ошибка',
                message: 'Произошла ошибка!',
                icon: 'fas fa-exclamation-triangle',
                type: 'error'
            });
        },
        showSuccessNotification() {
            this.$store.dispatch('addNotification', {
                title: 'Успех',
                message: 'Операция прошла успешно!',
                icon: 'fas fa-check-circle',
                type: 'success'
            });
        }
    }

}
</script>

<style lang="scss" scoped>
.main-block {
    /* margin: 20vh auto 0 auto; */
    padding: 0px 0 0 0;
    width: fit-content;
    display: grid;
    position: relative;
}

.home-block {
    position: relative;
    background-color: #4f6384;
    height: 250px;
    /* width: 150px; */
    margin: 20px 20px 0px 20px;
    border-radius: 40px;
    overflow: hidden;

    .home-block-background {
        display: flex;
        position: absolute;
        top: -40px;
        left: -10px;

        p {
            color: #5a6c8b;
            font-family: 'raleway-black', 'courier new', sans-serif;
            font-size: 30px;               /* Размер текста */
            margin: 0;
            padding: 0;
            line-height: 0.85;
            -webkit-user-select: none; /* Safari */
            -moz-user-select: none;    /* Firefox */
            -ms-user-select: none;     /* Internet Explorer/Edge */
            user-select: none;         /* Стандартное свойство */
        }
        
        .background-2, .background-1  {
            rotate: -10deg;
        }

        .background-1 p {
            color: transparent;            /* Делаем текст прозрачным */
            -webkit-text-stroke: 1.3px #5a6c8b; /* Толщина и цвет обводки */
            // text-fill-color: transparent;  /* Заполняющий цвет текста (тоже прозрачный) */
        }
    }

    h1 {
        user-select: none;
        color: white;
        vertical-align: middle;
        margin: 0;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        font-family: 'raleway-black', 'courier new', sans-serif;
   }
}

.more-info {
    margin: 20px 20px 0 20px;
    position: relative;
    overflow: hidden;

    p {
        font-family: 'century gothic', Georgia, serif;
        font-weight: 100;
        position: absolute;
        font-size: 180px;
        bottom: -100px;
        right: 25%;
        rotate: -60deg;
    }

    .more-info-arrow {
        // position: static;
        margin: 0;
        bottom: 20px;
        right: 20px;
        width: fit-content;

        svg {
            width: 15px;
            height: 15px;
            margin: 0px;
            rotate: 180deg;
        }
    }
}

@media (max-width: 480px) {
    .main-block {
        margin: 0;
        padding: 0px !important;
    }

    .home-block {
        height: 180px;

        h1 {
            font-size: 35px;
        }

        .home-block-background {
            p {
                font-size: 20px;               /* Размер текста */
                line-height: 0.85;
            }
            
        }
    }

}
</style>