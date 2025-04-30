<script setup lang="ts">
import type {HPIssue} from "@/types";
import {getPriorityName} from "@/helpers/issuePriorityMap.ts";

const props = defineProps<{
  issue: HPIssue
}>();


</script>

<template>
  <div class="issue__wrapper __fade">
    <div class="__header">
      <h2>{{ getPriorityName(issue.fields?.priority?.name) }}</h2>
      <h3>{{ issue.fields?.summary }}</h3>
    </div>
    <div class="__description minimalistic_scroll overflow-y-auto">
      <span>{{issue.fields?.description}}</span>
    </div>
    <div class="__chips">
      <div class="__chip __type-status">
        <span>{{issue.fields?.issuetype?.name}}</span>
        <v-icon :size="16" color="grey">mdi-chevron-double-right</v-icon>
        <span>{{issue.fields?.status?.name}}</span>
      </div>
      <div class="__chip __assignee">
        <v-icon :size="16" color="grey">mdi-account-hard-hat-outline</v-icon>
        <span>{{issue.fields?.assignee?.displayName}}</span>
      </div>
      <div class="__chip __linked">
        <span>В Jira</span>
        <v-icon :size="16" color="grey">mdi-open-in-new</v-icon>
        <a :href="`${issue.baseURL}/browse/${issue.key}`" target="_blank"></a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.issue__wrapper{
  margin-bottom: 10px;
  height: 85%;
  display: flex;
  flex-direction: column;
  .__header{
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    h2{
      color: #f44336;
    }
  }
  .__description{
    flex: 1 0 0;
    span{
      color: #7C7C7C;
    }
  }

  .__chips{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .__chip{
      padding: 3px 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      border: 2px solid #f44336;
      border-radius: 20px;
      position: relative;
      transition: 0.3s;

      &.__linked{
        &:hover{
          box-shadow: 0 0 5px #f44336;
        }
      }

      a{
        position: absolute;
        inset: 0;
      }
      span{
        font-size: 14px;
      }
    }
  }
}
</style>