<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps<{
  issue: any
}>()

const status = computed(() => props.issue?.fields?.status?.name?.toLowerCase() || '')

const isStarted = computed(() => ['сделать', 'в работе', 'в процессе'].includes(status.value))
const isQA = computed(() => status.value === 'на проверке qa')
const isTL = computed(() => status.value === 'на проверке tl')
const isPM = computed(() => status.value === 'на проверке pm')
const isCompleted = computed(() => ['готово', 'завершено', 'done'].includes(status.value))
</script>

<template>
  <div class="issue-progress">
    <div class="circle" :class="{ active: isStarted || isQA || isTL || isPM || isCompleted }">{{ '\<\/>' }}</div>
    <div class="line-m" :class="{ active: isQA || isTL || isPM || isCompleted }"></div>

    <div class="__tracked">
      <div class="circle middle" :class="{ active: isQA || isTL || isPM || isCompleted }">QA</div>
      <div class="line-i" :class="{ active: isTL || isPM || isCompleted }"></div>
      <div class="circle middle" :class="{ active: isTL || isPM || isCompleted }">TL</div>
      <div class="line-i" :class="{ active: isPM || isCompleted }"></div>
      <div class="circle middle" :class="{ active: isPM || isCompleted }">PM</div>
    </div>

    <div class="line-m" :class="{ active: isCompleted }"></div>
    <div class="circle" :class="{ active: isCompleted }">
      <v-icon>mdi-check</v-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.issue-progress {
  margin-top: auto;
  display: flex;
  align-items: center;
}

.__tracked {
  display: flex;
  align-items: center;
}

.line-m, .line-i {
  height: 4px;
  background-color: #4B4B4B;
  &.active{
    background-color: #D42929;
  }
}

.line-i {
  width: 20px;
}
.line-m {
  flex: 1;
}

.progress-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 12px;
    right: 12px;
    height: 4px;
    background-color: #D42929;
    transform: translateY(-50%);
    z-index: 0;
  }
}

.circle {
  width: 30px;
  height: 30px;
  background-color: #181818;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  color: #4B4B4B;
  border: 2px solid #4B4B4B;

  &.active {
    color: #181818;
    background-color: #D42929;
    border: none;
  }
}
</style>