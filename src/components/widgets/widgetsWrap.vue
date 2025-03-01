<script setup lang="ts">
import {vAutoAnimate} from '@formkit/auto-animate'
import NoteWidget from "@/components/widgets/noteWidget.vue";

</script>

<template>
  <div class="widgets__wrapper" v-auto-animate>
    <note-widget/>

  </div>
</template>

<style scoped lang="scss">
.widgets__wrapper {
  display: grid;
  gap: 10px;
  height: 100%;
  border-radius: 15px;
  animation: fade-slide-out 0.5s ease-in-out;

  grid-template-rows: auto;
  grid-template-columns: auto;
  grid-auto-flow: dense;
}

</style>