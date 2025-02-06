<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="project-not-select__wrapper">
    <span>Для начала нужно выбрать проект 😉</span>
    <v-btn class="text-none btn__base" variant="tonal" @click="router.push({name: 'settings'})">Выбрать</v-btn>
  </div>
</template>

<style scoped lang="scss">
.project-not-select__wrapper{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
</style>