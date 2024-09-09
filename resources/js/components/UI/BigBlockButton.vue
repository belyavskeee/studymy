<template>
  <div class="main-block-buttons">
      <div class="item-big-button" v-for="option in options" :key="option.header" @click="navigateToPage(option.path)">
        <div class="block-text-left">
          <h3>{{ option.header }}</h3>
          <p>{{ option.description }}</p>
          <div class="item-big-button-arrow-block">
            <div class="item-big-button-arrow">
              <div class="arrow-background"></div> <!-- Добавляем элемент фона -->
              <svg viewBox="0 0 90 62" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.000411987 30.9998C0.000411987 32.5536 0.432236 33.8112 1.87204 35.2911L25.3382 60.2979C26.4181 61.4078 27.6417 62 29.1534 62C32.1048 62 34.1921 59.7063 34.1921 56.6727C34.1921 55.1929 33.6165 53.6391 32.4648 52.6037L20.8757 41.4321L17.6307 38.2379C16.9764 37.5939 17.4631 36.4824 18.3801 36.5264L26.5625 36.9187L83.5003 36.9187C86.5236 36.9187 89.043 34.1812 89.043 30.9998C89.043 27.8185 86.5236 25.1549 83.5003 25.1549L26.5625 25.1549L18.3545 25.4923C17.4406 25.5298 16.9601 24.422 17.612 23.7804L20.8757 20.5682L32.4648 9.39595C33.6165 8.28668 34.1921 6.7327 34.1921 5.25296C34.1921 2.21955 32.1048 0 29.1534 0C27.6417 0 26.4181 0.591885 25.3382 1.70166L1.87204 26.7086C0.432236 28.1885 0.000411987 29.52 0.000411987 30.9998Z"/>
              </svg>
              <p class="arrow-text">Продолжить</p>
            </div>
          </div>
        </div>
          <div class="icon-background"></div>
          <div class="icon-container" v-html="option.icon"></div>
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

.item-big-button {
    display: block;
    position: relative;
  background-color: #dbe6f4; /* Цвет фона */
  border-radius: 38px;
  width: 380px;
  height: 180px;
  display: flex;
  flex-direction: column;
//   justify-content: center;
  align-items: center;
  -webkit-transition-duration: 0.5s; /* Safari */
  transition-duration: 0.5s;
  cursor: pointer;
  overflow: hidden;

  .icon-background {
      position: absolute;
      width: 180px;
      height: 180px;
      bottom: -75px;
      right: -60px;
      padding: 20px;
      border-radius: 50%;
      -webkit-transition-duration: 0.6s; /* Safari */
      transition-duration: 0.6s;
      // border: 1px solid #4E6384;
  }
  .icon-container {
      position: absolute;
      width: 60px;
      height: 60px;
      bottom: 40px;
      right: 40px;
      border-radius: 50%;
  }

  svg {
    width: 75px;
    height: 75px;
    fill: #4E6384;
    vertical-align: middle;
    -webkit-transition-duration: 0.6s; /* Safari */
    transition-duration: 0.6s;
    }

    p, h3 {
      z-index: 1;
    }

    p {
      font-size: 15px;
      text-align: left;
      margin: 5px 0 0 0;
      max-width: 80%;
      color: #4f6384;
      font-family: 'rubick-light', Georgia, serif;
      -webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
      /* C5D2E2 */
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

.item-big-button:hover {
  transform: scale(1.05); /* Эффект увеличения при наведении */
  //background-color: #4f6384;
  background: linear-gradient(45deg, rgb(79, 99, 132), rgb(86, 181, 184));
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
//   box-shadow: inset 0px 0px 10px rgba(255, 255, 255, 0.5);

    h3, p {
        color: white !important;
    }
    svg {
        fill: white !important;
    }
    .icon-background  {
        background-color: #5b6c86da;
    }

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
    display: block;
    position: relative;
    background-color: #dbe6f4; /* Цвет фона */
    border-radius: 38px;
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-transition-duration: 0.5s; /* Safari */
    transition-duration: 0.5s;
    cursor: pointer;
    overflow: hidden;
  }
}

</style>
