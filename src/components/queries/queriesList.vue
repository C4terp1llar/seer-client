<script setup lang="ts">

import {useQueriesStore} from "@/stores/queries.ts";
import QueriesItem from "@/components/queries/queriesItem.vue";
import PaginationLoader from "@/components/loaders/paginationLoader.vue";
import {computed, onMounted, ref} from "vue";
import QueiesListItemSkeleton from "@/components/loaders/queiesListItemSkeleton.vue";
import {vAutoAnimate} from '@formkit/auto-animate'

const queryStore = useQueriesStore()

const LIMIT = 4
const page = ref<number>(1);

const uploadData = async (withoutPending?: boolean) => {
  if (queryStore.hasMoreQueries){
    page.value += 1;
  }
  await queryStore.getQueries(page.value, LIMIT, withoutPending)
}

onMounted(async () => {
  await uploadData();
})

</script>

<template>
  <div class="queries-list__wrapper minimalistic_scroll__red">
    <queies-list-item-skeleton v-if="queryStore.loadPending"/>

    <div class="queries-list__content" v-if="!queryStore.loadPending && queryStore.queries && queryStore.queries.length" v-auto-animate>
      <queries-item @reload="uploadData(true)" v-for="q in queryStore.queries" :key="q._id" :q="q"/>

      <v-btn
          color="#FF3030"
          class="text-none align-self-center h-100"
          variant="outlined"
          rounded
          @click="uploadData"
          v-if="queryStore.hasMoreQueries || queryStore.loaMorePending"
          :disabled="queryStore.loaMorePending"
      >
        <template v-if="!queryStore.loaMorePending">
          Еще
        </template>
        <pagination-loader v-else/>
      </v-btn>

    </div>

    <h4 class="text-center" v-if="!queryStore.loadPending && queryStore.queries && !queryStore.queries.length">Запросов пока нет 🥴</h4>
  </div>
</template>

<style scoped lang="scss">
.queries-list__wrapper {
  //padding: 10px;
  //background: #282828;
  border-radius: 15px;
  overflow-y: auto;
  .queries-list__content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }
}
</style>
