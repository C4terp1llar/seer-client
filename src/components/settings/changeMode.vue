<script setup lang="ts">

import ChangeViewMode from "@/components/common/changeViewMode.vue";
</script>

<template>
  <div class="change-mode">
    <span>Выбранный проект</span>
    <change-view-mode/>
  </div>
</template>

<style scoped lang="scss">
.change-mode{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>