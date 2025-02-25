<script setup lang="ts">
import {useUserStore} from "@/stores/user.ts";
import ProjectNotSelect from "@/components/dashboard/projectNotSelect.vue";
import IssuesStatsList from "@/components/issues/issuesStatsList.vue";
import QueriesWrap from "@/components/queries/queriesWrap.vue";
import CreateQueryModal from "@/components/queries/createQueryModal.vue";
import {computed, ref, watch} from "vue";
import {useRoute} from "vue-router";
import QueriesHead from "@/components/queries/queriesHead.vue";
import QueriesList from "@/components/queries/queriesList.vue";

const userStore = useUserStore();

const route = useRoute();
const isCreateQueryVisible = computed(() => route.query.queryEditor && !route.query.queryView);
const isViewQueryVisible = computed(() => !route.query.queryEditor && route.query.queryView);

</script>

<template>
  <div class="dashboard-page__wrapper" v-if="userStore.userData">
    <project-not-select v-if="!userStore.userData.selectedProject"/>
    <div class="dashboard-page__content" v-else>
      <issues-stats-list :project="userStore.userData.selectedProject"/>
      <queries-head/>
      <queries-list/>
    </div>
  </div>

  <create-query-modal v-if="isCreateQueryVisible"/>
</template>

<style scoped lang="scss">
.dashboard-page__wrapper{
  height: 100%;
  width: 100%;
  padding: 10px;
  .dashboard-page__content{
    width: 100%;
    height: 100%;
    gap: 10px;
    display: flex;
    flex-direction: column;
  }
}
</style>