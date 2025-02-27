<script setup lang="ts">
import {useRouter} from "vue-router";

interface Props {
  text: string;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  backBtn?: boolean;
}

withDefaults(defineProps<Props>(), {
  icon: 'mdi-cancel',
  iconColor: 'currentColor',
  iconSize: 24
});

const router = useRouter()
</script>

<template>
  <div class="template__not-found">
    <div class="__text">
      <h3 class="ma-0">{{ text }}</h3>
      <v-icon :size="iconSize" :color="iconColor">{{icon}}</v-icon>
    </div>
    <v-btn class="text-none btn__base" v-if="backBtn" @click="router.back()">Назад</v-btn>
  </div>
</template>

<style scoped lang="scss">
.template__not-found{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  .__text{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>