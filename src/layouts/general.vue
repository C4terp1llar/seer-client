<script setup lang="ts">
import SideBar from "@/components/sideBar.vue";
import HeadBar from "@/components/headBar.vue";
import {useUserStore} from "@/stores/user.ts";
import {computed, onMounted, ref} from "vue";
import GifLoader from "@/components/loaders/gifLoader.vue";
import QueryModal from "@/components/queries/queryModal.vue";
import {useRoute} from "vue-router";
import EventEditor from "@/components/widgets/eventEditor.vue";
import GlobalLoader from "@/components/dashboard/globalLoader.vue";
import {useReloadStore} from "@/stores/reload.ts";
import {useViewModeStore} from "@/stores/view.ts";
import {vAutoAnimate} from '@formkit/auto-animate'

const userStore = useUserStore();
const reloadStore = useReloadStore();
const viewStore = useViewModeStore();

const pending = ref<boolean>(false);

onMounted(async () => {
  pending.value = true;
  await userStore.getUser();
  pending.value = false;
})

const route = useRoute();
const isQueryModalVisible = computed(() => (route.query.queryEditor || route.query.queryView));
const isEventEditorVisible = computed(() => (route.query.eventEditor || route.query.eventView));
</script>

<template>
  <div :class="viewStore.isDefaultViewMode ? 'wrapper' : 'wrapper__view-mode'" v-auto-animate>
    <aside class="aside" v-if="viewStore.isDefaultViewMode">
      <side-bar/>
    </aside>
    <header class="header">
      <head-bar/>
    </header>
    <main class="main">
      <gif-loader v-if="pending"/>
      <router-view v-else-if="!pending && userStore.userData"/>
      <global-loader v-if="reloadStore.compositePending"/>
    </main>
  </div>

  <query-modal v-if="isQueryModalVisible"/>
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
    z-index: 10;
  }
  .header{
    grid-row: span 1;
    grid-column: span 1;
    background: rgb(var(--v-theme-background));
    z-index: 10;
    position: sticky;
    top: 0;
  }
  .main{
    grid-row: span 1;
    grid-column: span 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }
}
.wrapper__view-mode{
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
  background: linear-gradient(
          to right,
          #480404 0%,
          #240202 13%,
          #000000 49%,
          #240202 88%,
          #480404 100%
  );
  .header{
    width: fit-content;
    margin: auto;
  }
  .main{
    width: 100%;
    height: 100%;
    flex: 1 0;
    display: flex;
    flex-direction: column;
    position: relative;
  }
}
</style>