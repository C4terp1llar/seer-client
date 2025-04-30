<script setup lang="ts">

import SkeletonLoader from "@/components/loaders/skeletonLoader.vue";
</script>

<template>
  <div class="hp-widget__sk __fade">
    <div class="skeleton__item-content">
      <skeleton-loader/>
      <div class="skeleton__item-control z-10">
        <skeleton-loader :brightness="0.8" class="z-10"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hp-widget__sk{
  height: 100%;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;


  .skeleton__item-content{
    position: relative;
    border-radius: 10px;
    height: 100%;
    width: 100%;
  }

  .skeleton__item-control{
    position: absolute;
    width: 130px;
    height: 40px;
    right: 15px;
    bottom: 15px;
    border-radius: 20px;
    overflow: hidden;
  }
}
</style>