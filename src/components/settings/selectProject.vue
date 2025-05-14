<script setup lang="ts">

import {useSettingsStore} from "@/stores/settings.ts";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user.ts";
import SkeletonLoader from "@/components/loaders/skeletonLoader.vue";

const stStore = useSettingsStore();
const uStore = useUserStore();

const projects = ref<string[] | null>(null);
const pending = ref<boolean>(false);

const selectedProject = ref<string | null>(uStore?.userData ? uStore.userData.selectedProject : null);

onMounted(async () => {
  pending.value = true;
  const data = await stStore.getProjects();
  if (data) {
    projects.value = data;
  }
  pending.value = false;
})

const handleSelectProject = async (val: string) => {
  await stStore.setProject(val);
}
</script>

<template>
  <div class="select-project__wrapper">
    <div class="loader" v-if="pending">
      <skeleton-loader/>
    </div>
    <div class="select-project__content" v-if="!pending && projects && projects.length">
      <span>Выбранный проект</span>
      <v-select
          v-model="selectedProject"
          v-if="projects"
          label="Проект"
          :items="projects"
          variant="solo-filled"
          density="comfortable"
          clearable
          hide-details
          @update:modelValue="handleSelectProject"
      ></v-select>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-project__wrapper{
  width: 100%;
  .select-project__content{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 25px;
  }
}
.loader{
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  height: 48px;
}
</style>