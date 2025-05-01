<script setup lang="ts">
import Modal from "@/components/common/modal.vue";
import {onMounted, ref} from "vue";
import ChooseTasks from "@/components/widgets/chooseTasks.vue";
import {useMainStore} from "@/stores/main.ts";
import {useUserStore} from "@/stores/user.ts";
import PinnedIssue from "@/components/widgets/pinnedIssue.vue";
import ErrorTemplate from "@/components/common/errorTemplate.vue";
import GifLoader from "@/components/loaders/gifLoader.vue";
import {vAutoAnimate} from '@formkit/auto-animate'

const store = useMainStore();
const userStore = useUserStore();

const issue = ref<any>(null)

const pending = ref<boolean>(false);
const setPending = ref<boolean>(false);
const isModalVisible = ref(false);

onMounted(async () => {
  if (!userStore.userData || !userStore.userData.selectedTask) return;
  await getPinnedIssue()
})

const getPinnedIssue = async () => {
  pending.value = true;
  const data = await store.getPinIssue();
  pending.value = false;

  if (data){
    issue.value = data.data;
  }
}

const handleSetIssue = async (key: string) => {
  if (!userStore.userData) return;
  isModalVisible.value =false;
  setPending.value = true;

  const data = await store.setPinIssue(key);

  setPending.value = false;

  if (data){
    issue.value = data.data;
    userStore.userData.selectedTask = key;
  }
}
</script>

<template>
  <div class="task-pin__wrapper __fade">
    <div class="__header">
      <h3>Личный приоритет</h3>
      <v-btn @click="isModalVisible = !isModalVisible" density="compact" variant="text" base-color="#f44336" :disabled="setPending" :loading="setPending" icon><v-icon :size="18">mdi-pencil-outline</v-icon></v-btn>
    </div>

    <div class="not_selected" v-if="!userStore.userData || !userStore.userData.selectedTask">
      <span class="font-weight-medium">Задача для отслеживания не выбрана 🥺</span>
    </div>
    <template v-else class="__fade">
      <gif-loader v-if="pending"/>

      <pinned-issue v-if="!pending && issue" :issue="issue"/>
      <error-template text="Упс... Какая-то ошибка :(" v-if="!pending && !issue"/>
    </template>
  </div>

  <modal @update:modelValue="args => isModalVisible = args" :model-value="isModalVisible">
    <choose-tasks @choose-issue="key => handleSetIssue(key)" @close="isModalVisible = !isModalVisible"/>
  </modal>
</template>

<style scoped lang="scss">
.task-pin__wrapper{
  height: 300px;
  min-width: 500px;
  max-width: 600px;

  border-radius: 10px;
  background: #282828;
  display: flex;
  flex-direction: column;
  position: relative;

  padding: 10px;

  .__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
}

.not_selected{
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>