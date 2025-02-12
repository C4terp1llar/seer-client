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
    <span :style="{ color: issueData.color }">{{ issueData.label }}</span>
    <h1>{{ value }}</h1>
    <img :src="issueData.image" :alt="issueData.label">
  </div>
</template>

<style scoped lang="scss">
.issues-stats-item {
  position: relative;
  width: 100%;
  border-radius: 10px;
  padding: 15px 0 10px 15px;
  height: 130px;
  background: #434343;
  display: flex;
  flex-direction: column;

  span {
    font-weight: 500;
  }

  h1 {
    margin-top: auto;
  }

  img {
    max-width: 100px;
    position: absolute;
    top: 50%;
    right: 10px;
  }
}
</style>
