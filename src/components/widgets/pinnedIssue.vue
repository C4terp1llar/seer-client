<script setup lang="ts">
import {formatShortName} from "@/helpers/formatFullName.ts";
import {formatShortDate} from "@/helpers/dateFormat.ts";
import PinnedIssueProgress from "@/components/widgets/pinnedIssueProgress.vue";
import {vAutoAnimate} from '@formkit/auto-animate'
defineProps<{
  issue: any
}>()
</script>

<template>
  <div class="issue__wrapper __fade">
    <div class="__header">
      <img class="priority-icon" :src="issue.fields?.priority?.iconUrl " alt="icon priority">
      <span>{{issue.key}}</span>
      <a class="__link" :href="`${issue?.self.split('/rest/')[0]}/browse/${issue.key}`" target="_blank"><v-icon color="black" :size="20">mdi-open-in-new</v-icon></a>
    </div>
    <div class="__content minimalistic_scroll" v-auto-animate>
      <div class="field">
        <span class="__heading">Наименование задачи</span>
        <span class="__value">{{issue.fields?.summary }}</span>
      </div>
      <div class="field-h" v-if="issue.fields?.assignee">
        <v-icon :size="16" color="green">mdi-account-hard-hat-outline</v-icon>
        <span class="__value">{{formatShortName(issue.fields?.assignee?.displayName)}}</span>
      </div>
      <div class="field-h" v-if="issue.fields?.customfield_10408">
        <v-icon :size="16" color="orange">mdi-bug-outline</v-icon>
        <span class="__value">{{formatShortName(issue.fields?.customfield_10408?.displayName)}}</span>
      </div>
      <div class="field">
        <span class="__heading">Дата создания</span>
        <span class="__value">{{formatShortDate(issue.fields?.created)}}</span>
      </div>
      <pinned-issue-progress :issue="issue"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.issue__wrapper{
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 7px 7px 15px 15px;
  background: #181818;
  overflow: hidden;

  .__header{
    padding: 3px;
    background: #D42929;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    .priority-icon{
      width: 20px;
    }
    span{
      font-size: 14px;
      font-weight: 600;
    }
  }
  .__content{
    padding: 5px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    flex: 1 0 0;
    .field{
      display: grid;
    }
    .field-h{
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .__heading{
      color: #5B5B5B;
      font-weight: 600;
    }
    .__value, .__heading{
      font-size: 14px;
    }
  }
}
</style>