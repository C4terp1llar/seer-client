<script setup lang="ts">
import QueryEditor from "@/components/queries/queryEditor.vue";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useQueriesStore} from "@/stores/queries.ts";
import type {JqlQuery} from "@/types";
import GifLoader from "@/components/loaders/gifLoader.vue";
import NotFoundTemplate from "@/components/common/notFoundTemplate.vue";
import {lockScroll, unlockScroll} from "@/helpers/modalScroll.ts";

const qStore = useQueriesStore();
const route = useRoute();

const queryMode = computed(() => {
  return route.query.queryView ? 'view' : 'create';
})

const pending = ref<boolean>(false)
const queryItem = ref<JqlQuery | null>(null)

onMounted(async () => {
  lockScroll()
  if(queryMode.value === "view") {
    pending.value = true;
    queryItem.value = await qStore.getJqlQueryById(String(route.query.queryView))
    pending.value = false;
  }
})

onUnmounted(() => unlockScroll())
</script>

<template>
  <div class="create-query__wrapper __create" v-if="queryMode === 'create'">
    <query-editor mode="create"/>
  </div>
  <div class="create-query__wrapper __view" v-else>
    <gif-loader v-if="pending"/>
    <query-editor :q="queryItem" :mode="queryMode" v-if="!pending && queryItem"/>
    <not-found-template back-btn text="Запрос не найден 🥴" icon="mdi-database-search" v-if="!pending && !queryItem"/>
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