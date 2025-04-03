<script setup lang="ts">
import CalendarDates from "@/components/widgets/calendarDates.vue";
import CalendarEvents from "@/components/widgets/calendarEvents.vue";
import {useCalendarStore} from "@/stores/calendar.ts";
import {onMounted} from "vue";

const calendarStore = useCalendarStore();

const selectDay = async (d: Date) => {
  await calendarStore.selectDay(d);
}

onMounted(async () => {
  await calendarStore.getMonthsEvents();
})
</script>

<template>
  <div class="personal-calendar__wrapper">
      <calendar-dates :schedule="calendarStore.monthsEvents" @day-select="d => selectDay(d)"/>
      <div class="line"></div>
      <calendar-events/>
  </div>
</template>

<style scoped lang="scss">
.personal-calendar__wrapper{
  display: grid;
  grid-template-columns: 1fr auto auto;

  .line{
    width: 2px;
    background-color: grey;
    margin: 0 10px;
  }
}
</style>