<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useMainStore} from "@/stores/main.ts";
import IssuesStatsSkeleton from "@/components/loaders/issuesStatsSkeleton.vue";
import IssuesStatsItem from "@/components/issues/issuesStatsItem.vue";
import type {IssuesShortStats} from "@/types";
import {vAutoAnimate} from '@formkit/auto-animate'
import {useViewModeStore} from "@/stores/view.ts";

const viewStore = useViewModeStore();

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
  <div :class="['issues-stats-list__wrapper', {'__extended': !viewStore.isDefaultViewMode}]">
    <issues-stats-skeleton class="w-100" :extended="!viewStore.isDefaultViewMode" v-if="mainStore.pendingIssuesStats"/>
    <div class="issues-stats-list__content" v-else-if="!mainStore.pendingIssuesStats && mainStore.issuesStats" v-auto-animate>
      <issues-stats-item
          v-for="([key, value]) in Object.entries(mainStore.issuesStats)"
          :key="key"
          :type="key as keyof IssuesShortStats"
          :value="value"
          :extended="!viewStore.isDefaultViewMode"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.issues-stats-list__wrapper{
  width: 100%;

  .issues-stats-list__content{
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    border-radius: 15px;
    background: #282828;
  }

  &.__extended{
    flex: 1 0;
    .issues-stats-list__content{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      height: 100%;
      :last-child {
        grid-column: span 2;
      }
    }

  }

}

</style>