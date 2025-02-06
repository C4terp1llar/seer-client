<script setup lang="ts">
import {useUserStore} from "@/stores/user.ts";
import ProjectNotSelect from "@/components/dashboard/projectNotSelect.vue";

const userStore = useUserStore();
</script>

<template>
  <div class="dashboard-page__wrapper" v-if="userStore.userData">

    <project-not-select v-if="!userStore.userData.selectedProject"/>

  </div>
</template>

<style scoped lang="scss">
.dashboard-page__wrapper{
  height: 100%;
  width: 100%;
  padding: 10px;
}
</style>