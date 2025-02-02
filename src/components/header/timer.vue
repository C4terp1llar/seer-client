<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { format } from "date-fns";

const currentTime = ref(format(new Date(), "HH:mm:ss"));

let timer: number | null = null;

const updateTime = () => {
  currentTime.value = format(new Date(), "HH:mm:ss");
};

onMounted(() => {
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="timer">
    🕒 {{ currentTime }}
  </div>
</template>

<style scoped>
.timer {
  font-weight: bold;
  font-family: monospace;
}
</style>
