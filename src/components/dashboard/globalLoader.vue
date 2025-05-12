<script setup lang="ts">

</script>

<template>
<div class="global-loader">
  <v-progress-linear
      color="red"
      indeterminate
  ></v-progress-linear>
</div>
</template>

<style scoped lang="scss">
.global-loader{
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>