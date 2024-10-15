import { createApp } from 'vue';
import App from '@/components/App.vue';
import Router from '@/router/router';
import Store from '@/store/store';

// import BigLoader from '@/components/UI/BigLoader.vue';
import Preloader from '@/components/UI/Preloader.vue';
import MyFooter from "@/components/MyFooter.vue";
import MyHeader from "@/components/MyHeader.vue";
import MyNotification from "@/components/Notification.vue";


const app = createApp(App);


// app.component('big-loader', BigLoader);
app.component('preloader', Preloader);
app.component('my-footer', MyFooter);
app.component('my-header', MyHeader);
app.component('my-notification', MyNotification);

app.use(Router);
app.use(Store);
app.mount('#app');

// window.onload = function() {
//     const appElement = document.getElementById('app');
//     if (appElement && appElement.__vue__) {
//         appElement.__vue__.isLoading = false; // Управляем глобальным состоянием лоадера
//     }
// };