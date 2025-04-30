<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useMainStore} from "@/stores/main.ts";
import {useUserStore} from "@/stores/user.ts";
import type {HPIssue} from "@/types";
import HpIssueSkeleton from "@/components/loaders/hpIssueSkeleton.vue";
import ErrorTemplate from "@/components/common/errorTemplate.vue";
import HighPriorityIssuesItem from "@/components/widgets/highPriorityIssuesItem.vue";
import HighPriorityIssuesControl from "@/components/widgets/highPriorityIssuesControl.vue";
import {vAutoAnimate} from '@formkit/auto-animate'
import GifLoader from "@/components/loaders/gifLoader.vue";

const store = useMainStore();
const userStore = useUserStore();

const pending = ref<boolean>(false);
const issue = ref<HPIssue | null>(null);
const index = ref<number>(0);

onMounted(async () => {
  await getIssue();
})

const getIssue = async () => {
  if (!userStore.userData || !userStore.userData.selectedProject) return;
  pending.value = true;

  const data = await store.getHPIssue(userStore.userData.selectedProject, index.value)

  if (data){
    const fullUrl = new URL(data.data.issue.self)
    issue.value = {
      ...data.data.issue,
      isFirst: data.data.isFirst,
      isLast: data.data.isLast,
      baseURL: `${fullUrl.protocol}//${fullUrl.host}`,
    } as HPIssue & { isFirst: boolean; isLast: boolean };
  }

  pending.value = false;
}

const handleSlide = async (i: number) => {
  index.value = i;
  await getIssue();
}
</script>

<template>
  <div class="issues-slider __fade">
    <gif-loader v-if="pending"/>

    <template v-if="!pending && issue" class="__fade" v-auto-animate>
      <high-priority-issues-item :issue="issue" v-auto-animate/>
      <high-priority-issues-control @next="i => handleSlide(i)" @prev="i => handleSlide(i)" :issue="issue" :index="index" v-auto-animate/>
    </template>

    <error-template text="Упс... Какая-то ошибка :(" v-if="!pending && !issue"/>
  </div>
</template>

<style scoped lang="scss">
.issues-slider{
  height: 300px;
  min-width: 500px;
  max-width: 600px;

  border-radius: 10px;
  background: #282828;
  display: flex;
  flex-direction: column;
  position: relative;

  padding: 10px;
}

</style>