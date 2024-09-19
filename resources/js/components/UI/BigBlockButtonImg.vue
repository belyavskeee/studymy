<template>
    <div class="main-block-buttons">
      <div 
        class="item-big-button-img" 
        v-for="option in options" 
        :key="option.header" 
        @click="navigateToPage(option.path)"
        
      >
        <div class="block-text-left">
          <h3>{{ option.header }}</h3>
          <p>{{ option.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  
  export default {
    props: {
      options: {
        type: Array,
        required: true
      },
    },
    methods: {
        navigateToPage(path) {
            this.$router.push(path);
        }
    },
    mounted() {
      AOS.init();
    }
  };
  </script>
  
    
  <style lang="scss">
  .main-block-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Два блока в ряду */
    gap: 20px;
    padding: 20px;
    justify-items: center;
  }
  
  .item-big-button-img {
    background: linear-gradient(90deg, rgba(78, 99, 132, 1) 11%, rgba(82, 179, 182, 0.563) 100%), 
              url('/resources/assets/images/qr_kode_scan.jpg') no-repeat center center; /* Добавляем фон */
  display: block;
  position: relative;
  background-size: cover;
  background-position: center center; /* Центрируем изображение */
  border-radius: 38px;
  width: 380px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-transition-duration: 0.5s; /* Safari */
  transition-duration: 0.5s;
  cursor: pointer;
  overflow: hidden;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none;    /* Firefox */
  -ms-user-select: none;     /* Internet Explorer/Edge */
  user-select: none;         /* Стандартное свойство */

  p, h3 {
    z-index: 1;
    color: white;
  }

  p {
    font-size: 15px;
    text-align: left;
    margin: 5px 0 0 0;
    max-width: 80%;
    font-family: 'rubick-light', Georgia, serif;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
  }

  h3 {
    font-size: 24px;
    font-weight: lighter;
    margin: 35px 0px 0 0;
    text-align: left;
    font-family: 'rubick-regular', Georgia, serif;
    -webkit-transition-duration: 0.5s; /* Safari */
    transition-duration: 0.5s;
  }

  .block-text-left {
    width: 80%;
    z-index: 1;
  }
}

  
  .item-big-button-img:hover {
    transform: scale(1.05); /* Эффект увеличения при наведении */
    // background-color: #4f6384;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  //   box-shadow: inset 0px 0px 10px rgba(255, 255, 255, 0.5);
  
      .arrow-text {
        transform: translateX(0);
        opacity: 1;
      }
      .arrow-background {
        width: 100%;
      }
  }
  
  
  .item-big-button-arrow-block {
    position: absolute;
    bottom: 35px;
    width: 80%;
  
    .item-big-button-arrow {
      // background-color: #4f6384;
      width: fit-content;
      // padding: 5px;
      border-radius: 20px;
      display: flex;
      -webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
      position: relative;
      overflow: hidden;
    }
  
    .arrow-background {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background-color: #4f6384; 
      width: 0; 
      transition: width 0.4s ease; 
      border-radius: 20px;
    }
  
    .arrow-text {
      color: white;
      margin: auto 7px auto 0;
      font-size: 11px;
      transform: translateX(-100%); /* Исходная позиция текста - вне экрана */
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    svg {
      background-color: #4f6384;
      padding: 5px 5px;
      border-radius: 20px;
      width: 15px;
      height: 15px;
      margin: 0px;
      fill: white !important;
      rotate: 140deg;
      vertical-align: middle;
      z-index: 1;
    }
  }
  
  @media (max-width: 900px) {
    .main-block-buttons {
      grid-template-columns: repeat(1, 1fr); /* Два блока в ряду */
    }
  }
  
  @media (max-width: 480px) {
  
    .item-big-button {
      width: 100%;
      height: 180px;
  
  
      p {
        font-size: 13px;
      }
  
      h3 {
        font-size: 24px;
      }
    
    }
  
  }
  
  </style>
  