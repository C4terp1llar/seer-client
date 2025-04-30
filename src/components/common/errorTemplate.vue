<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="template__err">
    <div class="__text">
      <h3 class="ma-0">{{ text }}</h3>
      <v-icon color="error">mdi-alert-circle-outline</v-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template__err{
  display: grid;
  width: inherit;
  height: inherit;

  .__text{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
}
</style>