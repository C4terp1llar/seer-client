<script setup lang="ts">
import { computed } from "vue";
import { issueTypeMap } from "@/helpers/issueTypeMap";
import type { IssuesShortStats } from "@/types";

type IssueType = keyof IssuesShortStats;

interface Props {
  type: IssueType;
  value: number;
}

const props = defineProps<Props>();

const issueData = computed(() => issueTypeMap[props.type]);
</script>

<template>
  <div class="issues-stats-item">
    <h1 :style="{ color: issueData.color }">{{ value }}</h1>
    <span>{{ issueData.label }}</span>
    <div class="issue__img" :style="{ color: issueData.color }">
      <img :style="{ color: issueData.color }" :src="issueData.image" :alt="issueData.label">
    </div>
  </div>
</template>

<style scoped lang="scss">
.issues-stats-item {
  @media (max-width: 950px){
    max-width: 200px;
  }
  position: relative;
  width: 100%;
  border-radius: 10px;
  padding: 15px 0 10px 15px;
  height: 165px;
  background: #434343;
  display: flex;
  flex-direction: column;

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
}
</style>
