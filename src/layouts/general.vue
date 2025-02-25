<script setup lang="ts">
import SideBar from "@/components/sideBar.vue";
import HeadBar from "@/components/headBar.vue";
import {useUserStore} from "@/stores/user.ts";
import {onMounted, ref} from "vue";
import GifLoader from "@/components/loaders/gifLoader.vue";

const userStore = useUserStore();

const pending = ref<boolean>(false);

onMounted(async () => {
  pending.value = true;
  await userStore.getUser();
  pending.value = false;
})
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
      <gif-loader v-if="pending"/>
      <router-view v-else-if="!pending && userStore.userData"/>
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
  background: linear-gradient(210deg, rgba(0,0,0,1) 77%, rgba(72,4,4,1) 115%);

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
    display: flex;
    flex-direction: column;
    max-height: inherit;
    overflow: auto;
  }
}
</style>