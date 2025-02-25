<script setup lang="ts">

import CreateQueryWrap from "@/components/queries/createQueryWrap.vue";
</script>

<template>
  <div class="queries-head">
    <h2>Конструктор</h2>
    <create-query-wrap/>
  </div>
</template>

<style scoped lang="scss">
.queries-head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}
</style>