<script setup lang="ts">
import {useUserStore} from "@/stores/user.ts";
import ProjectNotSelect from "@/components/dashboard/projectNotSelect.vue";
import IssuesStatsList from "@/components/issues/issuesStatsList.vue";
import QueriesWrap from "@/components/queries/queriesWrap.vue";
import {useRoute} from "vue-router";
import {type Component, computed} from "vue";
import WidgetsWrap from "@/components/widgets/widgetsWrap.vue";
import DashboardTabs from "@/components/dashboard/dashboardTabs.vue";
import type {DashboardTab} from "@/types";
import {useReloadStore} from "@/stores/reload.ts";

const userStore = useUserStore();
const reloadStore = useReloadStore();

const route = useRoute();

const activeTab = computed<DashboardTab>(() => {
  return route.query.tab as DashboardTab || 'queries';
});

const componentsMap: Record<DashboardTab, Component> = {
  queries: QueriesWrap,
  widgets: WidgetsWrap
};
</script>

<template>
  <div class="dashboard-page__wrapper" v-if="userStore.userData" :key="reloadStore.reloadKey">
    <project-not-select v-if="!userStore.userData.selectedProject"/>

    <div class="dashboard-page__content" v-else>
      <issues-stats-list :project="userStore.userData.selectedProject"/>
      <component :is="componentsMap[activeTab]"/>
      <dashboard-tabs :active-tab="activeTab"/>
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