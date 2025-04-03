<script setup lang="ts">
import { useCalendarStore } from "@/stores/calendar.ts";
import { vAutoAnimate } from "@formkit/auto-animate";
import {format} from "date-fns";
import CalendarEventsList from "@/components/widgets/calendarEventsList.vue";
import GifLoader from "@/components/loaders/gifLoader.vue";
import Modal from "@/components/common/modal.vue";
import EventEditor from "@/components/widgets/eventEditor.vue";
import {ref} from "vue";

const calendarStore = useCalendarStore();

const showEditor = ref(false);
</script>

<template>
  <div class="calendar-events__wrapper">
    <div class="events-head">
      <div class="__info" v-auto-animate>
        <span class="font-weight-medium">События</span>
        <span v-if="calendarStore.selectedDay" class="calendar__date-time __mth">{{ format(calendarStore.selectedDay, 'dd.MM.yyyy') }}</span>
      </div>
      <v-btn class="text-none"  variant="tonal" @click="showEditor = !showEditor" :loading="calendarStore.createPending" :disabled="calendarStore.createPending">Добавить</v-btn>
    </div>

    <div class="not_selected" v-if="calendarStore.loadPending">
      <gif-loader/>
    </div>

    <div class="not_selected" v-if="!calendarStore.selectedDay && !calendarStore.loadPending">
      <span class="font-weight-medium">Выберите день 🤗</span>
    </div>

    <calendar-events-list :data="calendarStore.events" v-if="calendarStore.selectedDay && calendarStore.events && !calendarStore.loadPending"/>
  </div>

  <modal :model-value="showEditor">
    <event-editor @close="showEditor = !showEditor"/>
  </modal>
</template>

<style scoped lang="scss">
.calendar-events__wrapper{
  width: 250px;
  display: flex;
  flex-direction: column;

  .events-head{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .__info{
      display: flex;
      flex-direction: column;
    }
  }
  .not_selected{
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
  }
}
</style>