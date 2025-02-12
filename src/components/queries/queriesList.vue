<script setup lang="ts">

import {useQueriesStore} from "@/stores/queries.ts";
import QueriesItem from "@/components/queries/queriesItem.vue";
import PaginationLoader from "@/components/loaders/paginationLoader.vue";
import {onMounted, ref} from "vue";
import GifLoader from "@/components/loaders/gifLoader.vue";

const queryStore = useQueriesStore()

const LIMIT = 25
const page = ref<number>(1);

const uploadData = async () => {
  await queryStore.getQueries(page.value, LIMIT)
}

onMounted(async () => {
  await uploadData();
})
</script>

<template>
  <div class="queries-list__wrapper">
    <gif-loader v-if="queryStore.loadPending"/>

    <div class="queries-list__content" v-if="!queryStore.loadPending && queryStore.queries && queryStore.queries.length">
      <queries-item v-for="q in queryStore.queries" :key="q._id" :q="q"/>

      <v-btn
          color="green"
          class="text-none"
          variant="text"
          @click="uploadData"
          v-if="queryStore.hasMoreQueries && !queryStore.loaMorePending"
      >
        Еще
      </v-btn>

      <pagination-loader v-if="queryStore.loaMorePending"/>
    </div>

    <h4 class="text-center" v-if="!queryStore.loadPending && queryStore.queries && !queryStore.queries.length">Запросов пока нет 🥴</h4>
  </div>
</template>

<style scoped lang="scss">
.queries-list__wrapper {
  flex-direction: column;
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 15px;
  background: #282828;
}
</style>