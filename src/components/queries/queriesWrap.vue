<script setup lang="ts">
import QueriesList from "@/components/queries/queriesList.vue";
import QueriesHead from "@/components/queries/queriesHead.vue";
</script>

<template>
  <div class="queries__wrapper ">
    <queries-head />
    <queries-list />
  </div>
</template>

<style scoped lang="scss">
.queries__wrapper {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 10px;
  animation: fade-slide-in 0.5s ease-in-out;
}

</style>
