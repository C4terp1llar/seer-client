<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useMainStore} from "@/stores/main.ts";
import IssuesStatsSkeleton from "@/components/loaders/issuesStatsSkeleton.vue";
import IssuesStatsItem from "@/components/issues/issuesStatsItem.vue";
import type {IssuesShortStats} from "@/types";

interface Props {
  project: string
}
const props = defineProps<Props>()

const mainStore = useMainStore();

onMounted(async () => {
  await mainStore.getIssuesStats(props.project)
})
</script>

<template>
  <div class="issues-stats-list__wrapper">
    <issues-stats-skeleton class="w-100" v-if="mainStore.pendingIssuesStats"/>
    <div class="issues-stats-list__content" v-else-if="!mainStore.pendingIssuesStats && mainStore.issuesStats">
      <issues-stats-item
          v-for="([key, value]) in Object.entries(mainStore.issuesStats)"
          :key="key"
          :type="key as keyof IssuesShortStats"
          :value="value"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.issues-stats-list__wrapper{
  width: 100%;
  .issues-stats-list__content{
    display: flex;
    gap: 10px;
    padding: 10px;
    border-radius: 15px;
    background: #282828;
  }
}
</style>