<script setup lang="ts">
import {useReloadStore} from "@/stores/reload.ts";
import {formatShortDate} from "@/helpers/dateFormat.ts";

const reloadStore = useReloadStore();
</script>

<template>
  <div class="reload-info__wrapper">
    <v-btn density="comfortable" class="text-none" variant="tonal" @click="reloadStore.handReload()" :loading="reloadStore.compositePending" :disabled="reloadStore.compositePending">Обновить</v-btn>
    <span class="last-update">{{formatShortDate(reloadStore.lastReload)}}</span>
  </div>
</template>

<style scoped lang="scss">
.reload-info__wrapper{
  margin-right: auto;
  margin-left: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  .last-update{
    color: #4E4E4E;
    font-weight: 500;
  }
}
</style>