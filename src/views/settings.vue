<script setup lang="ts">

import SelectProject from "@/components/settings/selectProject.vue";
import ChangeMode from "@/components/settings/changeMode.vue";
</script>

<template>
  <div class="settings-page__wrapper">
    <select-project/>
  </div>
</template>

<style scoped lang="scss">
.settings-page__wrapper{
  height: 100%;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>