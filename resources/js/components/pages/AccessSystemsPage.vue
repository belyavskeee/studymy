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
            
            <big-block-button :options="valueButtons"/>
        </div>
    </div>
    <my-footer/>
</template>

<script>
import BigBlockButton from "@/components/ui/BigBlockButton.vue";
import RotatingText from '@/components/ui/RotatingText.vue';
import { bottom, right } from "@popperjs/core";
import { mapGetters, mapActions } from 'vuex';
export default {
    components: {
        BigBlockButton,
        RotatingText
    },
    data() {
        return {
            valueButtons: [
            { 
                header: 'Авторизация',
                description: 'Войдите в систему или зарегистрируйтесь',
                path: '/login',
                icon: '<svg id="Capa_1" enable-background="new 0 0 480 480" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"><g><path d="m360 452.01c-66.274 0-120-53.726-120-120s53.726-120 120-120 120 53.726 120 120c-.075 66.243-53.757 119.925-120 120zm0-208c-48.601 0-88 39.399-88 88s39.399 88 88 88 88-39.399 88-88c-.057-48.577-39.423-87.942-88-88z"></path><path d="m344 388.01c-4.245.008-8.317-1.68-11.312-4.688l-32-32c-6.139-6.356-5.963-16.485.394-22.624 6.2-5.988 16.03-5.988 22.23 0l20.688 20.68 52.688-52.68c6.356-6.139 16.485-5.963 22.624.394 5.988 6.2 5.988 16.03 0 22.23l-64 64c-2.995 3.008-7.067 4.696-11.312 4.688z"></path><path d="m16 412.01c-8.837 0-16-7.163-16-16 .222-76.297 48.067-144.336 119.792-170.352-47.312-39.846-53.364-110.502-13.518-157.814s110.502-53.364 157.814-13.518 53.364 110.502 13.518 157.814c-13.074 15.524-30.121 27.203-49.318 33.79-8.364 2.852-17.456-1.616-20.308-9.98s1.616-17.456 9.98-20.308c41.792-14.337 64.048-59.839 49.711-101.631s-59.839-64.048-101.631-49.711-64.048 59.839-49.711 101.631c8.012 23.353 26.358 41.699 49.711 49.711 8.364 2.852 12.832 11.944 9.979 20.308-1.88 5.512-6.606 9.567-12.339 10.588-78.76 14.032-131.68 74.096-131.68 149.472 0 8.837-7.163 16-16 16z"></path></g></svg>'
            },
            { 
                header: 'Учебные заведения',
                description: 'Выбрать учебное заведение',
                path: '/institutions',
                icon: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m421.823 369.012c8.284 0 15-6.716 15-15v-19.999c0-8.284-6.716-15-15-15s-15 6.716-15 15v19.999c0 8.284 6.716 15 15 15z"></path><path d="m421.823 449.006c8.284 0 15-6.716 15-15v-19.999c0-8.284-6.716-15-15-15s-15 6.716-15 15v19.999c0 8.284 6.716 15 15 15z"></path><path d="m225.252 319.013c-8.284 0-15 6.716-15 15v19.999c0 8.284 6.716 15 15 15s15-6.716 15-15v-19.999c0-8.284-6.716-15-15-15z"></path><path d="m301.752 334.013c0-8.284-6.716-15-15-15s-15 6.716-15 15v19.999c0 8.284 6.716 15 15 15s15-6.716 15-15z"></path><path d="m86.431 319.013c-8.284 0-15 6.716-15 15v19.999c0 8.284 6.716 15 15 15s15-6.716 15-15v-19.999c0-8.284-6.716-15-15-15z"></path><path d="m86.431 399.007c-8.284 0-15 6.716-15 15v19.999c0 8.284 6.716 15 15 15s15-6.716 15-15v-19.999c0-8.285-6.716-15-15-15z"></path><path d="m497 228.094c-10.691 0-11-13.464-11-14.999s.309-14.999 11-14.999c8.284 0 15-6.716 15-15s-6.716-15-15-15h-72.974l-153.024-58.756v-19.334h75.003c5.532 0 10.615-3.045 13.226-7.922 2.61-4.877 2.323-10.796-.745-15.398l-14.452-21.677 14.452-21.677c3.068-4.603 3.355-10.521.745-15.398-2.61-4.878-7.693-7.922-13.226-7.922h-90.003c-8.284 0-15 6.716-15 15v59.996 34.334l-153.024 58.754h-72.978c-8.284 0-15 6.716-15 15s6.716 15 15 15c12.377 0 13.004 12.494 13.004 14.999s-.627 14.999-13.004 14.999c-8.284 0-15 6.716-15 15 0 .026.004.051.004.077v253.819c0 8.284 6.716 15 15 15h481.996c8.284 0 15-6.716 15-15v-253.896c0-8.285-6.716-15-15-15zm-183.475-174.765 4.452 6.677h-46.975v-29.996h46.974l-4.451 6.677c-3.36 5.039-3.36 11.603 0 16.642zm-57.523 82.387 84.33 32.38h-168.66zm-200.265 62.38h35.023 330.484 36.911c-1.416 4.744-2.155 9.809-2.155 14.999s.739 10.255 2.155 14.999h-402.418c1.489-4.743 2.267-9.806 2.267-14.999s-.777-10.256-2.267-14.999zm214.699 283.894h-29.999v-37.984c0-8.271 6.729-14.999 14.999-14.999 8.271 0 15 6.729 15 14.999zm-15-82.983c-24.813 0-44.999 20.187-44.999 44.999v37.984h-30v-223.896h149.998v223.896h-29.999v-37.984c0-24.813-20.187-44.999-45-44.999zm-225.432-140.913h120.433v223.896h-120.433zm451.996 223.896h-121.565v-223.896h121.565z"></path></svg>'
            }
        ],
        title: ''
        };
    },
    computed: {
    ...mapGetters(['isAuthenticated']),
    },
    mounted() {
        document.title = 'Главная - beStudy';
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