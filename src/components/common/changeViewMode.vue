<script setup lang="ts">
import {useViewModeStore} from "@/stores/view.ts";

const viewStore = useViewModeStore();

</script>

<template>
  <div class="change-view-mode">
    <v-btn @click="viewStore.toggleViewMode"  density="comfortable" variant="text" base-color="#9D9D9D" icon><v-icon :size="30">mdi-fullscreen-exit</v-icon></v-btn>
  </div>
</template>

<style scoped lang="scss">

</style>