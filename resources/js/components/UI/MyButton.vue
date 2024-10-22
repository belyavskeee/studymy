<template>
    <input type="button">
</template>
  
  <script>
  
  export default {
    props: {
      options: {
        type: Array,
        required: true,
      },
      color_theme: {
        type: string,
        default: 'e', // количество колонок по умолчанию
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
          padding: "20px",
          "justify-items": "center",
        };
      },
    },
  };
  </script>
  
  <style lang="scss">

  .item-big-button {
    background-color: #4f6384;
    border-radius: 50px;
    width: 100%; /* Занимает всю ширину колонки */
    cursor: pointer;
    overflow: hidden;
    user-select: none;
    text-align: center;
    color: white;
    font-family: 'rubick-light', Georgia, serif;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
  
    
  
    &:hover {
      transform: scale(1.05);
    }
  }
  </style>
  