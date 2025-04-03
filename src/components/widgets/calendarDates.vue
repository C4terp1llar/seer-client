<script setup lang="ts">
import { ref, computed } from "vue";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isPast } from "date-fns";
import { ru } from "date-fns/locale";
import {useCalendarStore} from "@/stores/calendar.ts";

const emit = defineEmits<{
  (e: 'daySelect', date: Date)
}>();

const props = defineProps<{
  schedule: string[];
}>()

const currentDate = ref(new Date());
const selectedDate = ref<Date | null>(null);
const initialDate = new Date();
const maxDate = new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, 1);

const daysInMonth = computed(() => {
  return eachDayOfInterval({
    start: startOfMonth(currentDate.value),
    end: endOfMonth(currentDate.value),
  });
});

const prevMonth = () => {
  if (currentDate.value > initialDate) {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
  }
};

const nextMonth = () => {
  if (currentDate.value < maxDate) {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
  }
};

const selectDate = (date: Date) => {
  selectedDate.value = date;
  emit('daySelect', date);
};
</script>

<template>
  <div class="calendar__dates">
    <div class="calendar-header">
      <div class="__title">
        <span class="font-weight-medium">Календарь</span>
        <span class="calendar__date-time __mth">9:00 - 18:00</span>
      </div>
      <div class="__actions">
        <v-btn @click="prevMonth" :disabled="currentDate <= initialDate" icon density="compact" variant="plain"><v-icon>mdi-chevron-left</v-icon></v-btn>
        <span class="calendar__date-time ">{{ format(currentDate, "LLLL", { locale: ru }) }}, {{ format(currentDate, "yyyy") }}</span>
        <v-btn @click="nextMonth" :disabled="currentDate >= maxDate" icon density="compact" variant="plain"><v-icon>mdi-chevron-right</v-icon></v-btn>
      </div>
    </div>
    <div class="calendar-days">
      <div class="calendar-day__wrap"
           v-for="(day, index) in daysInMonth"
           :key="day.toISOString()"
           :class="{
             'past-day__wrap': isPast(day),
             'pd-start': isPast(day) && (index === 0 || !isPast(daysInMonth[index - 1])),
             'pd-end': isPast(day) && (index === daysInMonth.length - 1 || !isPast(daysInMonth[index + 1]))
           }"
      >
        <div class="calendar-day"
             @click="selectDate(day)"
             :class="{
             'past-day': isPast(day) && !isToday(day),
             'today': isToday(day),
             'selected': selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
           }"
        >
          <span class="day">{{ format(day, "d") }}</span>
          <div class="event-indicator" v-if="schedule && schedule.length && schedule.includes(format(day, 'yyyy-MM-dd'))"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar__dates {
  display: flex;
  flex-direction: column;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 3px;
  gap: 5px;
  .__actions{
    display: flex;
    align-items: center;
    gap: 5px;
    height: fit-content;
  }
  .__title{
    display: flex;
    flex-direction: column;
  }
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 10px 0 0 0;
  .calendar-day__wrap{
    padding: 0 3px;
    margin: 3px 0;

    &.past-day__wrap{
      background-color: rgb(113, 113, 113);
    }
    &.pd-start {
      border-top-left-radius: 19px;
      border-bottom-left-radius: 19px;
      padding: 0 3px 0 0;
      left: 3px;
      position: relative;
    }
    &.pd-end {
      border-top-right-radius: 19px;
      border-bottom-right-radius: 19px;
      padding: 0 0 0 3px;
      width: fit-content;
    }

    .calendar-day {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      background-color: #313131;
      position: relative;
      transition: 0.2s;
      &:hover{
        filter: drop-shadow(0 0 2px darkred);
      }
      .event-indicator{
        position: absolute;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #66FF40;
        bottom: 5px;
      }
    }
  }
}




.past-day {
  background-color: rgb(113, 113, 113) !important;
}

.today {
  background-color: red !important;
}
.selected {
  border: 2px solid darkred !important;
}
</style>