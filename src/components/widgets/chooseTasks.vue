<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useMainStore} from "@/stores/main.ts";
import {useUserStore} from "@/stores/user.ts";
import GifLoader from "@/components/loaders/gifLoader.vue";
import ErrorTemplate from "@/components/common/errorTemplate.vue";
import {getPriorityName} from "@/helpers/issuePriorityMap.ts";
import ScrollContainer from "@/components/common/scrollContainer.vue";
import IssuesList from "@/components/issues/issuesList.vue";

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'chooseIssue', key: string): void
}>();

onMounted(async () => {
  await loadIssues(false);
});

const store = useMainStore();
const userStore = useUserStore();

const issues = ref<any[]>([]);
const startAt = ref(0);
const isLast = ref(false);
const pending = ref<boolean>(false);
const maxResults = 20;

const q = ref<string>('');

const loadIssues = async (isSearch?:boolean) => {
  if (!userStore.userData || !userStore.userData.selectedProject) return;

  if (isSearch) {
    issues.value = [];
    startAt.value = 0;
    isLast.value = false;
  }

  pending.value = startAt.value === 0;

  const response = await store.getPaginatedIssues(userStore.userData.selectedProject, startAt.value, maxResults, q.value);

  pending.value = false;

  if (response?.data?.issues) {
    issues.value.push(...response.data.issues);
    isLast.value = response.data.isLast;
    startAt.value += maxResults;
  }else{
    isLast.value = true;
    startAt.value = 0;
    issues.value = [];
  }
};


const clearSearch = async () => {
  q.value = "";
  startAt.value = 0;
  issues.value = [];
  await loadIssues(false);
}

let debounceTimeout: number | undefined;

const handleInput = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = window.setTimeout(() => {
    loadIssues(true);
  }, 1000);
};

</script>

<template>
  <div class="tasks__wrapper">
    <div class="__header">
      <button @click="emit('close')" class="close__btn">
        <v-icon :size="24">mdi-close</v-icon>
      </button>
      <h3 class="text-center">Задачи</h3>
      <v-text-field
          label="Ключ задачи"
          v-model.trim="q"
          variant="outlined"
          hide-details="auto"
          density="comfortable"
          maxlength="32"
          class="mt-2 mb-2"
          @input="handleInput"
          :append-inner-icon="q ? 'mdi-close' : 'mdi-magnify'"
          @click:append-inner="q ? clearSearch() : false"
          rounded
      />
    </div>

    <gif-loader v-if="pending"/>

    <div class="__content" v-if="!pending && issues">
      <issues-list @choose-issue="key => emit('chooseIssue', key)" :issues="issues"/>

      <v-btn density="comfortable" class="text-none align-self-center" base-color="red" v-if="!isLast" @click="loadIssues(false)" :disabled="pending">Еще</v-btn>
      <span class="text-center" v-if="!issues.length">По вашему запросу ничего не найдено :(</span>
    </div>

    <error-template text="Упс... Какая-то ошибка :(" v-if="!pending && !issues"/>
  </div>
</template>

<style scoped lang="scss">
.tasks__wrapper {
  width: 600px;

  border-radius: 10px;
  background: #282828;
  display: flex;
  flex-direction: column;

  padding: 10px;
  position: relative;

  .__header{
    display: flex;
    flex-direction: column;
    position: sticky;
    top: -10px;
    z-index: 10;
    background: #282828;
    padding: 5px 0;
    border-radius: 0 0 10px 10px;
  }
  .__content{
    display: grid;
    gap: 10px;
  }
}
.close__btn {
  position: absolute;
  right: 0;
  top: 0;
}

</style>