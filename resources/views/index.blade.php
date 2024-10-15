<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <style>
        @font-face {
            font-family: 'Raleway-Black';
            src: url('{{ asset('/resources/assets/fonts/Raleway-Black.ttf') }}') format('truetype');
        }

        /* Стили для лоадера */
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #4E6384;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.2s;
        }

        #preloader p {
            font-size: 100px;
            font-family: 'Raleway', 'Arial', sans-serif;
            font-weight: 900;
            color: white;
        }

        .font-loading {
            color: transparent !important; /* скрываем текст */
            height: 1em;
            overflow: hidden;
            position: relative;
        }

        /* Пример для плавного появления текста */
        .font-loaded {
            color: #000; /* Цвет текста */
            opacity: 0; /* Скрываем текст перед показом */
            transition: opacity 0.5s ease-in-out; /* Плавное появление текста */
        }

        .font-visible {
            opacity: 1; /* Плавное проявление текста */
        }

        @media all and (max-width: 900px) {
            #preloader p {
                font-size: 50px;
            }
        }

        @media all and (max-width: 480px) {
            #preloader p {
                font-size: 40px;
            }
        }
    </style>

    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <div id="preloader">
        <p class="font-loading font-loaded" id="text-block">beStudy.by</p>
    </div>
    <div id="app"></div>

    <script>
        window.addEventListener('load', function() {
            const preloader = document.getElementById('preloader');
            preloader.style.transition = 'opacity 0.5s';
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 400); // 500 мс для плавного исчезновения
        });

        if (document.fonts) {
            document.fonts.load('1em Raleway').then(function() {
                const textBlock = document.getElementById('text-block');
                textBlock.classList.remove('font-loading');
                textBlock.classList.add('font-visible'); // Показываем текст с анимацией
            });
        } else {
            // Если browser не поддерживает document.fonts, просто покажите текст после некоторой задержки
            setTimeout(() => {
                const textBlock = document.getElementById('text-block');
                textBlock.classList.remove('font-loading');
                textBlock.classList.add('font-visible');
            }, 1000); // ожидание 3 сек
        }
    </script>
</body>
</html>
