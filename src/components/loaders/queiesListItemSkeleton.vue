<script setup lang="ts">

import SkeletonLoader from "@/components/loaders/skeletonLoader.vue";
</script>

<template>
  <div class="skeleton__wrap">
    <div class="skeleton__item" v-for="i in 5" :key="i">
      <skeleton-loader class="z-10"/>
    </div>
    <skeleton-loader class="z-1" :brightness="0.7"/>
  </div>
</template>

<style scoped lang="scss">
.skeleton__wrap{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  position: relative;
  overflow: hidden;
  .skeleton__item{
    padding: 5px;
    border-radius: 10px;
    gap: 5px;
    background: #434343;
    min-height: 150px;
    grid-column: span 1;
    height: 165px;
    max-height: 165px;
    position: relative;
    overflow: hidden;
    z-index: 10;
  }
}
</style>