import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    // server: {
    //     host: true, // Это позволяет использовать IP-адрес для доступа
    //     port: 5173, // Убедитесь, что порт 5173 используется для Vite
    //     hmr: {
    //         host: '172.20.10.2' // Замените это на IP-адрес вашей машины
    //     }
    // },
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
        },
    },
});
