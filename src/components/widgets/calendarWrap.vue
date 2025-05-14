<script setup lang="ts">

import PersonalCalendar from "@/components/widgets/personalCalendar.vue";
import {onMounted, onUnmounted} from "vue";
import {useCalendarStore} from "@/stores/calendar.ts";

const calendarStore = useCalendarStore();

onUnmounted(() => {
  calendarStore.events = null;
  calendarStore.selectedDay = null
  calendarStore.hasMoreEvents = null
  calendarStore.monthsEvents = [];
})
</script>

<template>
<div class="calendar__wrapper">
  <personal-calendar/>
</div>
</template>

<style scoped lang="scss">
.calendar__wrapper{
  width: fit-content;
  height: fit-content;
  overflow: hidden;
  padding: 7.5px 10px;

  border-radius: 10px;
  background: #282828;
}
</style>