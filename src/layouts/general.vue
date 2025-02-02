<script setup lang="ts">

import SideBar from "@/components/sideBar.vue";
import HeadBar from "@/components/headBar.vue";
</script>

<template>
  <div class="wrapper">
    <aside class="aside">
      <side-bar/>
    </aside>
    <header class="header">
      <head-bar/>
    </header>
    <main class="main">
      <router-view/>
    </main>
  </div>
</template>

<style scoped lang="scss">
.wrapper{
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;

  .aside{
    grid-row: span 2;
    grid-column: span 1;
  }
  .header{
    grid-row: span 1;
    grid-column: span 1;
    position: sticky;
    top: 0;
    background: rgb(var(--v-theme-background));
  }
  .main{
    grid-row: span 1;
    grid-column: span 1;
  }


}
</style>