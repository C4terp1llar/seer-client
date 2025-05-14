<script setup lang="ts">
import {useUserStore} from "@/stores/user.ts";
import ProjectNotSelect from "@/components/dashboard/projectNotSelect.vue";
import IssuesStatsList from "@/components/issues/issuesStatsList.vue";
import QueriesWrap from "@/components/queries/queriesWrap.vue";
import {useRoute} from "vue-router";
import {type Component, computed, onMounted, onUnmounted} from "vue";
import WidgetsWrap from "@/components/widgets/widgetsWrap.vue";
import DashboardTabs from "@/components/dashboard/dashboardTabs.vue";
import type {DashboardTab} from "@/types";
import {useReloadStore} from "@/stores/reload.ts";
import {useViewModeStore} from "@/stores/view.ts";
import ExtendedWatch from "@/components/dashboard/extendedWatch.vue";

const userStore = useUserStore();
const reloadStore = useReloadStore();
const viewStore = useViewModeStore();

const route = useRoute();

const activeTab = computed<DashboardTab>(() => {
  return route.query.tab as DashboardTab || 'queries';
});

const componentsMap: Record<DashboardTab, Component> = {
  queries: QueriesWrap,
  widgets: WidgetsWrap
};



//каждые 10 мин релоад данных
let intervalId: number | null = null;

onMounted(() => {
  intervalId = setInterval(() => {
    reloadStore.handReload();
  }, 600_000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="dashboard-page__wrapper" v-if="userStore.userData" :key="reloadStore.reloadKey">
    <project-not-select v-if="!userStore.userData.selectedProject"/>

    <div class="dashboard-page__content" v-else>
      <issues-stats-list :project="userStore.userData.selectedProject"/>

      <template v-if="viewStore.isDefaultViewMode">
        <component :is="componentsMap[activeTab]"/>
        <dashboard-tabs :active-tab="activeTab"/>
      </template>
      <template v-else>
        <extended-watch/>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-page__wrapper{
  height: 100%;
  padding: 5px 10px;

  .dashboard-page__content{
    height: 100%;
    gap: 10px;
    display: flex;
    flex-direction: column;
  }
}
</style>