<script setup lang="ts">
import {useRouter} from "vue-router";
import {useQueriesStore} from "@/stores/queries.ts";

const router = useRouter();
const qStore = useQueriesStore()
</script>

<template>
  <div class="create-query-wrap">
    <v-btn class="text-none btn__base" variant="tonal" :loading="qStore.createPending" @click="router.push({query: {queryEditor: 1}})">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<style scoped lang="scss">

</style>