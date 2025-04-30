<script setup lang="ts">
import {vAutoAnimate} from '@formkit/auto-animate'
import NoteWidget from "@/components/widgets/noteWidget.vue";
import PersonalCalendar from "@/components/widgets/personalCalendar.vue";
import CalendarWrap from "@/components/widgets/calendarWrap.vue";
import HighPriorityIssuesSlider from "@/components/widgets/highPriorityIssuesSlider.vue";

</script>

<template>
  <div class="widgets__wrapper" v-auto-animate>
    <note-widget/>
    <calendar-wrap/>
    <high-priority-issues-slider/>
  </div>
</template>

<style scoped lang="scss">
.widgets__wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 100%;
  border-radius: 15px;
  animation: fade-slide-out 0.5s ease-in-out;

}

</style>