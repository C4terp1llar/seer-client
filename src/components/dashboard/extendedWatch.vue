<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive } from "vue";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const currentTime = ref(format(new Date(), "HH:mm"));
const currentWeekday = ref(format(new Date(), "EEEE", { locale: ru }));
const currentDate = ref(format(new Date(), "d MMMM", { locale: ru }));

const styleVars = reactive({
  '--progress-start': '0%',
  '--progress-end': '0%'
});

let intervalId: number | null = null;

const updateDateTime = () => {
  const now = new Date();
  const progress = ((now.getHours() * 60 + now.getMinutes()) / 1440) * 100;
  const progressEdge = Math.min(progress + 10, 100); // Ограничение на 100%

  currentTime.value = format(now, "H:mm");
  currentWeekday.value = format(now, "EEEE", { locale: ru }).toUpperCase();
  currentDate.value = format(now, "d MMMM", { locale: ru });

  styleVars['--progress-start'] = `${progress}%`;
  styleVars['--progress-end'] = `${progressEdge}%`;
};

onMounted(() => {
  updateDateTime();
  intervalId = setInterval(updateDateTime, 1000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>


<template>
  <div class="extended-watch__wrapper" :style="styleVars">
    <div class="__inner">
      <span class="__time">{{ currentTime }}</span>
      <div class="__date ga-1 justify-center align-center d-flex flex-column">
        <span class="__weekday">{{ currentWeekday }}</span>
        <span class="__day">{{ currentDate }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.extended-watch__wrapper {
  border: 5px solid transparent;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  background:
      linear-gradient(#505050, #505050) padding-box,
      linear-gradient(
              90deg,
              #f44336 0%,
              #FF8C4F var(--progress-start),
              #FF8181 var(--progress-end),
              #505050 100%
      ) border-box;
}

.__inner {
  display: flex;
  padding: 10px;
  justify-content: center;
  gap: 15px;
  background: #282828;

  .__time {
    font-size: 4rem;
    font-weight: 600;
    line-height: 1;
  }

  .__date {
    .__weekday {
      font-size: 1.5rem;
      line-height: 1;
      font-weight: 500;
    }

    .__day {
      font-size: 1.2rem;
      line-height: 1;
      font-weight: 300;
    }
  }
}
</style>
