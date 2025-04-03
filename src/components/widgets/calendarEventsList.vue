<script setup lang="ts">

import {ref} from "vue";
import type {Event} from "@/types";
import {useCalendarStore} from "@/stores/calendar.ts";

const props = defineProps<{
  data: Event[]
}>()

const collapsedEventId = ref<string>("");

const handleCollapseEvent = (id: string) => {
  collapsedEventId.value === id ? collapsedEventId.value = "" : collapsedEventId.value = id;
}

const calendarStore = useCalendarStore();
const loadMore = async () => {
  if (calendarStore.selectedDay){
    await calendarStore.getEventsByDay(calendarStore.selectedDay)
  }
}

</script>

<template>
  <div class="events minimalistic_scroll">

    <div v-if="data && data.length" :class="{'event': true, '__active': collapsedEventId === item._id }" v-for="item in data" :key="item._id" :style="{'border-left-color': item.color}">
      <div class="__info">
        <div class="__name">
          <span class="__title font-weight-medium">{{item.title}}</span>
          <span class="calendar__date-time __mth">{{ item.time_from }} - {{item.time_to}}</span>
        </div>

        <v-btn class="transition-all" icon variant="plain" density="compact"
               @click="handleCollapseEvent(item._id)" v-if="item.description"
        >
          <v-icon>{{collapsedEventId === item._id ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
        </v-btn>
      </div>

      <v-scroll-y-transition>
        <div class="__short-desc" v-if="collapsedEventId === item._id">
          <span class="text__wrap">{{item.description}}</span>
        </div>
      </v-scroll-y-transition>
    </div>

    <v-btn v-if="calendarStore.hasMoreEvents" class="align-self-center text-none" variant="text" color="red" @click="loadMore" :disabled="calendarStore.loaMorePending" :loading="calendarStore.loaMorePending">Еще</v-btn>

    <div class="not_selected" v-if="!data || !data.length">
      <span class="font-weight-medium">Событий пока нет 🥺</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.events{
  display: grid;
  max-height: 225px;
  height: 100%;
  overflow-y: auto;

  .event{
    margin: 5px 0;
    padding: 0 10px;
    border-left-width: 2px;
    border-left-style: solid;
    height: fit-content;

    display: flex;
    flex-direction: column;
    background-color: inherit;
    transition: .3s;

    &.__active{
      background-color: #393838;
      border-radius: 5px;
    }

    .__info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .__name{
        display: flex;
        flex-direction: column;
      }
    }
    .__short-desc{
      font-size: 14px;
    }
  }
}

.not_selected{
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>