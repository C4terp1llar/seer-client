<script setup lang="ts">
import type { JqlQuery } from "@/types";
import { formatShortDate } from "../../helpers/dateFormat.ts";
import {computed, ref} from "vue";
import JqlResponseViewer from "@/components/queries/jqlResponseViewer.vue";
import {useQueriesStore} from "@/stores/queries.ts";
import {useRouter} from "vue-router";

const emit = defineEmits<{
  (e: 'reload'): void
}>()

interface Props {
  q: JqlQuery;
}

const props = defineProps<Props>();

const isTotalOnly = computed(() => {
  return props.q.result && Object.keys(props.q.result).length === 1 && "total" in props.q.result;
});

const queryStore = useQueriesStore()

const delPending = ref<boolean>(false)
const deleteQuery = async () => {
  delPending.value = true;
  await queryStore.deleteJqlQuery(props.q._id)
  delPending.value = false;
  emit('reload')
}

const router = useRouter();
</script>

<template>
  <div :class="['queries-item__wrapper minimalistic_scroll', {'__expand': !isTotalOnly}]">
    <div class="queries-item__title">
      <span>{{ q.name }}</span>
      <v-btn icon variant="tonal" color="#FF3030" class="delete__btn" density="compact" @click="deleteQuery" :loading="delPending" :disabled="delPending">
        <v-icon :size="18">mdi-trash-can-outline</v-icon>
      </v-btn>
    </div>
    <div :class="['queries-item__result', {'__short': isTotalOnly}]">
      <h1 v-if="isTotalOnly">{{q.result.total}}</h1>
      <jql-response-viewer v-else :data="q.result" status="success" short-mode/>
    </div>
    <div class="queries-item__time">
      <v-btn icon variant="text" density="compact" @click="router.push({query: {queryView: q._id}})"><v-icon>mdi-open-in-new</v-icon></v-btn>
      <span class="queries-item__date-text">Создано {{ formatShortDate(q.createdAt) }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.queries-item__wrapper {
  padding: 5px 5px 0 5px;
  border-radius: 10px;
  gap: 5px;
  background: #434343;
  min-height: 150px;
  grid-column: span 1;
  height: 165px;
  max-height: 165px;

  display: grid;
  grid-template-rows: auto 1fr auto;

  overflow: auto;
  //&.__expand{
  //  grid-column: span 2;
  //}

  .queries-item__title {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    .delete__btn{
      align-self: start;
    }
    span {
      font-size: 16px;
      font-weight: 500;
      color: #A4A4A4;
    }
  }

  .queries-item__result{
    height: 100%;
    display: grid;
    align-items: center;
    h1{
      margin-left: 10px;
      font-size: 70px;
      line-height: 1;
    }
  }

  .queries-item__time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    position: sticky;
    background: #434343;
    bottom: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding-bottom: 5px;
  }
}

span {
  font-size: 14px;
  font-weight: 500;
}

.queries-item__date-text {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.8;
}
</style>
