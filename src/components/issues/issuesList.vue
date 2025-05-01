<script setup lang="ts">
import {formatShortName} from "@/helpers/formatFullName.ts";
import {formatShortDate} from "@/helpers/dateFormat.ts";

defineProps<{
  issues: any
}>()

const emit = defineEmits<{
  (e: 'chooseIssue', key: string): void
}>()
</script>

<template>
  <div class="issues">
    <div
        class="issue"
        v-for="issue in issues"
        :key="issue.key"
    >
      <v-btn @click="emit('chooseIssue', issue.key)" class="choose__btn" density="compact" variant="tonal" base-color="green" icon><v-icon :size="18">mdi-check</v-icon></v-btn>

      <div class="__heading d-flex align-items-center ga-2">
        <img class="priority-icon" :src="issue.fields?.priority?.iconUrl " alt="icon priority">
        <h4 class="__topic">{{ issue.fields?.summary }}</h4>
      </div>

      <div class="field __type-status">
        <span>{{issue.fields?.issuetype?.name}}</span>
        <v-icon :size="16" color="grey">mdi-chevron-double-right</v-icon>
        <span>{{issue.fields?.status?.name}}</span>
      </div>

      <div class="field __tester" v-if="issue.fields?.customfield_10408">
        <v-icon :size="16" color="warning">mdi-bug-outline</v-icon>
        <span>{{formatShortName(issue.fields?.customfield_10408?.displayName)}}</span>
      </div>

      <div class="field __assignee" v-if="issue.fields?.assignee">
        <v-icon :size="16" color="green">mdi-account-hard-hat-outline</v-icon>
        <span>{{formatShortName(issue.fields?.assignee?.displayName)}}</span>
      </div>

      <div class="d-flex align-center justify-space-between __add-data">
        <small class="__date">{{formatShortDate(issue.fields?.created)}}</small>
        <div class="__issue-key d-flex align-center ga-2">
          <small class="__issue-key">{{issue.key}}</small>
          <a class="__link" :href="`${issue?.self.split('/rest/')[0]}/browse/${issue.key}`" target="_blank"><v-icon color="red" :size="20">mdi-open-in-new</v-icon></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.issues {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px 0;

  .issue {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px;
    border-radius: 10px;
    border: 2px solid #3D3D3D;
    position: relative;
  }
  .field{
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .priority-icon{
    width: 20px;
  }
  .choose__btn{
    position: absolute;
    top: 5px;
    right: 5px;
  }
  span{
    font-size: 14px;
  }
  .__date{
    color: grey;
  }
  .__topic{
    margin-right: 30px;
  }
}

</style>