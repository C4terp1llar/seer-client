<script setup lang="ts">

import SkeletonLoader from "@/components/loaders/skeletonLoader.vue";
</script>

<template>
  <div class="issues-stats-skeleton">
    <div class="issues-stats-skeleton__item" v-for="i in 5" :key="i">
      <skeleton-loader class="z-10"/>
    </div>
    <skeleton-loader class="z-1" :brightness="0.7"/>
  </div>
</template>

<style scoped lang="scss">

.issues-stats-skeleton{
  display: flex;
  position: relative;
  gap: 10px;
  border-radius: 15px;
  padding: 10px;
  overflow: hidden;
  .issues-stats-skeleton__item{
    border-radius: 10px;
    position: relative;
    width: 100%;
    height: 165px;
    overflow: hidden;
    z-index: 10;
  }
}
</style>