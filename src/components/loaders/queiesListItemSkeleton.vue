<script setup lang="ts">

import SkeletonLoader from "@/components/loaders/skeletonLoader.vue";
</script>

<template>
  <div class="queries-item-sk">
    <skeleton-loader/>
  </div>
</template>

<style scoped lang="scss">
.queries-item-sk{
  position: relative;
  padding: 25px;
  border-radius: 10px;
  overflow: hidden;
}
</style>