<template>
    <div class="auth-block main-block">
        
    </div>
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
                description: 'Узнать подробнее об системе',
                path: '/login',
                image: new URL('/resources/assets/images/qr_kode_scan.jpg', import.meta.url).href
            },
            {
                header: 'Распознавание лиц',
                description: 'Прочитать подробнее',
                path: '/institutions',
                image: new URL('/resources/assets/images/face_system.jpg', import.meta.url).href
            }
        ],
        title: ''
        };
    },
    computed: {
    ...mapGetters(['isAuthenticated']),
    },
    async mounted() {
        document.title = 'Вывод инофрмации - beStudy';
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
        padding: 0px !important;
    }
    .more-info {
        width: auto;
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