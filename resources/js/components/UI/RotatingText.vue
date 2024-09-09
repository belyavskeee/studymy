<template>
  <div class="circle-container">
    <div class="rotating-text">
      <span v-for="(char, index) in textArray" :key="index" :style="getStyle(index)">
        {{ char }}
      </span>
    </div>
  </div>
</template>

<!-- <div>
    <RotatingText :style="{ bottom: '-50px', right: '-50px' }" text=" Цифровизация для учреждений образования" />
</div> -->

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Spinning Text Around Circle'
    }
  },
  computed: {
    textArray() {
      return this.text.split('');
    }
  },
  methods: {
    getStyle(index) {
      return {
        '--i': index + 1,
        '--total': this.textArray.length,
        transform: `rotate(calc(360deg / var(--total) * ${index})) translate(0, -85px)`  // Уменьшаем радиус
      };
    }
  }
};
</script>

<style scoped>
.circle-container {
  width: 170px; /* Уменьшен размер */
  height: 170px; /* Уменьшен размер */
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  /* background-color: #f0f0f0; */
  border-radius: 50%;
  overflow: hidden;
}

.rotating-text {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: center;
  animation: spin 10s linear infinite;
  color: white;
  font-family: 'rubick-regular', Georgia, serif;
}

.rotating-text span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 0 0px;
  transform: rotate(calc(360deg / var(--total) * var(--i))) translate(0, -50px); /* Уменьшенный радиус */
  font-size: 16px; /* Уменьшен размер шрифта */
  font-weight: bold;
  letter-spacing: -10px; /* Уменьшено расстояние между буквами */
  white-space: nowrap;
}

@keyframes spin {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
