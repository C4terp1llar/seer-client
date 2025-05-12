<script setup lang="ts">
import {vAutoAnimate} from '@formkit/auto-animate'
import NoteWidget from "@/components/widgets/noteWidget.vue";
import PersonalCalendar from "@/components/widgets/personalCalendar.vue";
import CalendarWrap from "@/components/widgets/calendarWrap.vue";
import HighPriorityIssuesSlider from "@/components/widgets/highPriorityIssuesSlider.vue";
import TaskPin from "@/components/widgets/taskPin.vue";

</script>

<template>
  <div class="widgets__wrapper" v-auto-animate>
    <div class="widgets__wrapper-str">
      <calendar-wrap/>
      <high-priority-issues-slider/>
    </div>
    <div class="widgets__wrapper-str">
      <task-pin/>
      <note-widget/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.widgets__wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 100%;
  border-radius: 15px;
  animation: fade-slide-out 0.5s ease-in-out;

  .widgets__wrapper-str{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
}

</style>