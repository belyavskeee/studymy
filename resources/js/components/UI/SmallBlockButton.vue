<template>
    <div class="main-block-buttons" :style="gridStyles">
      <div 
        class="item-big-button-img" 
        v-for="(option, index) in options"
        :key="option.header"
        :style="[getButtonStyles(option.spanButton), { maxWidth: maxWidth, backgroundImage: `url('${option.image}')`}]"
        @click="navigateToPage(option.path)"
      >
        <div class="block-text-left">
          <h3>{{ option.header }}</h3>
          <p>{{ option.description }}</p>
        </div>
        <!-- <div class="item-big-button-arrow-block">
              <div class="item-big-button-arrow" style="box-shadow: 0px 2px 10px 0px rgba(236, 236, 236, 0.1); padding: 5px 10px;">
                <div style="background-color: #DBE6F4;" class="arrow-background"></div>
                <p style="color: #4E6384; font-weight: bold;" class="arrow-text">Подробнее</p>
              </div>
        </div> -->
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
            required: true,
        },
        columns: {
            type: Number,
            default: 2, // количество колонок по умолчанию
        },
        maxWidth: {
            type: String,
            required: false, // Пропс не обязателен
            default: '400px',
        },
      },
    methods: {
        navigateToPage(path) {
            this.$router.push(path);
        },
        getButtonStyles(index) {
            const span = index || 1;
            return {
                "grid-column": `span ${index}`,
            };
        },
    },
    computed: {
        gridStyles() {
        return {
            "grid-template-columns": `repeat(${this.columns}, 1fr)`, // задаем количество колонок через пропс
            gap: "20px",
            "justify-items": "center",
        };
        },
    },
      mounted() {
        AOS.init();
      }
    };
    </script>
    
      
    <style lang="scss" scoped>
    .main-block-buttons {
        display: grid;
        gap: 20px;
        // justify-items: center;
        height: -webkit-fill-available;
    }
    
    .item-big-button-img {
        display: block;
        position: relative;
        border-radius: 25px;
        width: 100%;
        height: 100%;
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
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
  
    p, h3 {
    //   z-index: 3;
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
      font-size: 16px;
      margin: 0;
      text-align: left;
      font-weight: normal;
      font-family: "rubick-regular", Georgia, serif;
      -webkit-transition-duration: 0.5s; /* Safari */
      transition-duration: 0.5s;
    }
  
    .block-text-left {
        position: absolute;
        left: 20px;
        margin: 13px 0;
        width: fit-content;
        z-index: 2;
    }

    ::before {
        content: "";
        z-index: -1;
        position: absolute;
        top: -125px;
        left: -60px;
        width: 180px;
        height: 180px;
        backdrop-filter: blur(25px);
        pointer-events: none;
        mask-image: radial-gradient(circle, black 20%, transparent 70%);
    }
  }
  
    
    .item-big-button-img:hover {
      transform: scale(1.05); /* Эффект увеличения при наведении */
      // background-color: #4f6384;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    //   box-shadow: inset 0px 0px 10px rgba(255, 255, 255, 0.5);
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
    
      .item-big-button-img {
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
    