<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Timer from "@/components/header/timer.vue";

const pageTitles: Record<string, string> = {
  "/app/dashboard": "DASHBOARD",
  "/app/settings": "Настройки",
};

const route = useRoute();

const pageTitle = computed(() => pageTitles[route.path] || "Страница");
</script>

<template>
  <div class="header-page__wrapper">
    <h2>{{ pageTitle }}</h2>
    <timer/>
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
</style>
