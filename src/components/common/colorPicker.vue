<script setup lang="ts">
import {onUnmounted, ref} from 'vue';

const emit = defineEmits<{
  (e: 'updateColor', color: string): void
}>()

const colorValue = ref<number>(0);

const getColor = () => {
  return `hsl(${colorValue.value}, 100%, 50%)`;
};
</script>

<template>

  <input
      type="range"
      min="0"
      max="360"
      v-model="colorValue"
      class="slider"
      @input="emit('updateColor', getColor())"
  />

</template>

<style scoped>

.slider {
  width: 100%;
  appearance: none;
  height: 15px;
  background: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red);
  outline: none;
  border-radius: 15px;
  padding: 0 !important;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  border: 5px solid currentColor;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  border: 5px solid currentColor;
  cursor: pointer;
}
</style>
