<script setup lang="ts">
import type {HPIssue} from "@/types";
import {vAutoAnimate} from '@formkit/auto-animate'

const props = defineProps<{
  issue: HPIssue,
  index: number
}>();

const emit = defineEmits<{
  (e: 'next', index: number): void
  (e: 'prev', index: number): void
}>()

const handleSlide = (act: 'next' | 'prev') => {
  const index = act === 'prev' ? props.index - 1 : props.index + 1;

  if (act === 'prev') {
    emit('prev', index);
  } else {
    emit('next', index);
  }
}

</script>

<template>
  <div class="controls__wrapper __fade">
    <div class="__prev">
      <v-btn :disabled="issue.isFirst" @click="handleSlide('prev')" density="compact" variant="text" icon><v-icon>mdi-chevron-left</v-icon></v-btn>
    </div>
    <div class="__content">
      <span>{{issue.key}}</span>
      <img :src="issue.fields?.priority?.iconUrl" alt="priority icon">
    </div>
    <div class="__next">
      <v-btn :disabled="issue.isLast" @click="handleSlide('next')" density="compact" variant="text" icon><v-icon>mdi-chevron-right</v-icon></v-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.controls__wrapper {
  margin-left: auto;
  background: #3D3D3D;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: fit-content;

  .__content{
    background: #2C2C2C;
    border-radius: 5px;
    padding: 5px;
    gap: 5px;
    display: grid;
    grid-template-columns: auto 15px;
    align-items: center;
    img{
      max-width: 15px;
    }
    span{
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>