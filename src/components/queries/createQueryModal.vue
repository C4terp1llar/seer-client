<script setup lang="ts">

import CreateQueryEditor from "@/components/queries/createQueryEditor.vue";
</script>

<template>
  <div class="create-query__wrapper">
    <create-query-editor mode="create"/>
  </div>
</template>

<style scoped lang="scss">
.create-query__wrapper {
  position: fixed;
  inset: 0;
  z-index: 10003;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}
</style>