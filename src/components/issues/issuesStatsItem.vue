<script setup lang="ts">
import {computed, ref} from "vue";
import { issueTypeMap } from "@/helpers/issueTypeMap";
import type { IssuesShortStats } from "@/types";
import ChooseTasks from "@/components/widgets/chooseTasks.vue";
import Modal from "@/components/common/modal.vue";

type IssueType = keyof IssuesShortStats;

interface Props {
  type: IssueType;
  value: number;
  extended: boolean
}

const props = defineProps<Props>();

const issueData = computed(() => issueTypeMap[props.type]);

const isModalVisible = ref(false)
</script>

<template>
  <div :class="['issues-stats-item', `${type}`, {'__extended': extended}]">
    <h1 :style="{ color: issueData.color }">{{ value }}</h1>
    <span>{{ issueData.label }}</span>
    <div class="issue__img" :style="{ color: issueData.color }">
      <img :style="{ color: issueData.color }" :src="issueData.image" :alt="issueData.label">
    </div>
    <button @click="isModalVisible = !isModalVisible" class="btn-show__tasks"></button>
  </div>

  <modal @update:modelValue="args => isModalVisible = args" :model-value="isModalVisible">
    <choose-tasks @close="isModalVisible = !isModalVisible" :special-heading="issueData.label" :special-mode="type"/>
  </modal>
</template>

<style scoped lang="scss">

.issues-stats-item {
  &:not(&.__extended) {
    @media (max-width: 950px){
      max-width: 200px;
    }
  }

  position: relative;
  width: 100%;
  border-radius: 10px;
  padding: 15px 0 10px 15px;
  height: 165px;
  background: #434343;
  display: flex;
  flex-direction: column;
  transition: .3s;

  &.__extended{
    width: 100%;
    height: 100%;

    h1 {
      font-size: 8rem;
    }
    span {
      font-size: 2rem;
    }
  }

  &:hover{
    filter: brightness(80%);
  }

  span {
    font-weight: 500;
    color: #9D9D9D;
  }

  h1 {
    margin-top: auto;
    line-height: 1;
    font-size: 70px;
  }


  .issue__img{
    position: absolute;
    right: 10px;
    top: 10px;
    box-shadow: inset 0 0 6px currentColor;
    background: #282828;
    border-radius: 5px;
    padding: 7px;

    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 32px;
      height: 32px;
      object-fit: contain;
    }
  }

  .btn-show__tasks{
    position: absolute;
    inset: 0;
  }

}
</style>
