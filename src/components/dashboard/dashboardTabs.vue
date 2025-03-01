<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import type { DashboardTab } from "@/types";

defineProps<{ activeTab: DashboardTab }>();

const router = useRouter();
const route = useRoute();

const tabs: DashboardTab[] = ["queries", "widgets"];

const setTab = (tab: DashboardTab) => {
  router.push({ query: { ...route.query, tab } });
};
</script>

<template>
  <div class="dashboard-tabs__wrapper">
    <button
        v-for="tab in tabs"
        :key="tab"
        class="dashboard-tab"
        :class="{ active: tab === activeTab }"
        @click="setTab(tab)"
    ></button>
  </div>
</template>

<style scoped lang="scss">
.dashboard-tabs__wrapper {
  z-index: 10;
  display: flex;
  justify-content: center;
  gap: 10px;
  position: sticky;
  bottom: 10px;

  .dashboard-tab {
    padding: 8px;
    border-radius: 50%;
    background-color: #545454;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #FFFFFF;
    }

    &.active {
      background-color: #FFFFFF;
      border-radius: 8px;
      padding: 8px 15px;
    }
  }
}
</style>
