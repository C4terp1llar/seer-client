<script setup lang="ts">
import type {JqlQuery} from "@/types";
import {formatShortDate} from "../../helpers/dateFormat.ts";

interface Props {
  q: JqlQuery
}

const props = defineProps<Props>();
</script>

<template>
  <div class="queries-item__wrapper">
    <div class="queries-item__title">
      <span>{{q.name}}</span>
    </div>
    <div class="queries-item__resource">
      <span>JQL: {{q.query}}</span>
      <span v-if="q.fields.length">Fields: {{q.fields}}</span>
    </div>
    <div class="queries-item__time">
      <span class="queries-item__date-text" v-if="q.createdAt !== q.updatedAt">Обновлено {{formatShortDate(q.updatedAt)}}</span>
      <span class="queries-item__date-text">Создано {{formatShortDate(q.createdAt)}}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.queries-item__wrapper{
  padding: 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: #434343;

  .queries-item__title{
    span{
      font-size: 14px;
      font-weight: 500;
    }
  }

  .queries-item__resource, .queries-item__time{
    display: flex;
    flex-direction: column;
  }
  .queries-item__time{
    justify-content: flex-end;
    text-align: right;
  }
}

span{
  font-size: 14px;
  font-weight: 500;
}

.queries-item__date-text{
  font-size: 12px;
  font-weight: 500;
  opacity: .8;
}
</style>