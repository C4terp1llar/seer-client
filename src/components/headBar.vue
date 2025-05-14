<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Timer from "@/components/header/timer.vue";
import Reload from "@/components/header/reload.vue";
import {useViewModeStore} from "@/stores/view.ts";
import ChangeViewMode from "@/components/common/changeViewMode.vue";

const viewStore = useViewModeStore();

const pageTitles: Record<string, string> = {
  "/app/dashboard": "DASHBOARD",
  "/app/settings": "Настройки",
};

const route = useRoute();

const pageTitle = computed(() => pageTitles[route.path] || "Страница");
</script>

<template>
  <div v-if="viewStore.isDefaultViewMode" class="header-page__wrapper">
    <h2>{{ pageTitle }}</h2>
    <reload/>
    <timer/>
    <change-view-mode class="ml-3"/>
  </div>
  <div v-else class="header-page__wrapper-extended">
    <div class="logo">
      <img src="/img/short-logo.svg" alt="logo">
      <RouterLink to="/app/dashboard"/>
    </div>
    <div class="line"></div>
    <change-view-mode/>
  </div>
</template>

<style scoped lang="scss">
.header-page__wrapper {
  width: 100%;
  height: 76px;
  border-bottom: 1px solid #4B4B4B;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: rgba(0,0,0,1);
}

.header-page__wrapper-extended{
  background: #282828;
  border-radius: 15px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  .logo{
    position: relative;
    width: 50px;
    height: 45px;
    img{
      width: inherit;
    }
    a{
      position: absolute;
      inset: 0;
    }
  }

}
</style>
