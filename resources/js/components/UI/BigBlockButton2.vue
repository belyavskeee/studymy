<template>
  <div class="main-block-buttons" :style="gridStyles">
    <div
      class="item-big-button"
      v-for="(option, index) in options"
      :key="option.header"
      :style="[getButtonStyles(option.spanButton), { maxWidth: maxWidth }]"
      @click="navigateToPage(option.path)"
    >
      <div class="block-text-left">
        <h3>{{ option.header }}</h3>
        <p 
          :style="{ maxWidth: maxWidthText }"
        >{{ option.description }}</p>
      </div>
      <div class="icon-background"></div>
      <div class="icon-container" v-html="option.icon"></div>
    </div>
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

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
    maxWidthText: {
      type: String,
      required: false,
      default: 'auto',
    }
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
  },
};
</script>

<style lang="scss">
.main-block-buttons {
  display: grid;
  gap: 20px;
  justify-items: center;
}

.item-big-button {
  background-color: #e8eff9;
  border-radius: 50px;
  // max-width: 400px;
  width: 100%; /* Занимает всю ширину колонки */
  height: 150px;
  display: flex;
  flex-direction: column;
  // align-items: center;
  transition-duration: 0.5s;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  position: relative;
  will-change: transform;

  .icon-container {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 25px;
    left: 25px;
    border-radius: 50%;
  }

  svg {
    width: 38px;
    height: 35px;
    fill: #4E6384;
    vertical-align: middle;
    -webkit-transition-duration: 0.6s; /* Safari */
    transition-duration: 0.6s;
    }

    p, h3 {
      z-index: 1;
    }

    p {
      font-size: 13px;
      text-align: left;
      margin: 0;
      
      color: #4f6384;
      font-family: 'rubick-light', Georgia, serif;
      -webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
    }

    h3 {
      font-size: 19px;
      font-weight: lighter;
      margin: 0;
      text-align: left;
      font-family: 'rubick-regular', Georgia, serif;
      -webkit-transition-duration: 0.5s; /* Safari */
      transition-duration: 0.5s;
    }

    .block-text-left {
      position: relative;
      top: 70px;
      margin: 0 25px;
      z-index: 1;
    }

  &:hover {
    transform: scale(1.05);
  }
}
</style>
