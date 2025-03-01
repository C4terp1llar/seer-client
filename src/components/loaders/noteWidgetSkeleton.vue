<script setup lang="ts">

import SkeletonLoader from "@/components/loaders/skeletonLoader.vue";
</script>

<template>
  <div class="note-widget__sk">
    <div class="skeleton__item-head">
      <skeleton-loader/>
    </div>
    <div class="skeleton__item-content">
      <skeleton-loader/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.note-widget__sk{
  height: 100%;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;

  .skeleton__item-head,
  .skeleton__item-content{
    position: relative;
    border-radius: 10px;
  }

  .skeleton__item-head{
    height: 20%;
    margin-bottom: 10px;
  }
  .skeleton__item-content{
    height: 80%;
  }
}
</style>