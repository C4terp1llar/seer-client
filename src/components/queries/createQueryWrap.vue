<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="create-query-wrap">
    <v-btn class="text-none btn__base" variant="tonal" @click="router.push({query: {queryEditor: 1}})">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<style scoped lang="scss">

</style>