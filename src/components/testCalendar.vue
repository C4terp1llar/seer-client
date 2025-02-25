<template>
  <div class="calendar">
    <div class="header">
      <button @click="prevMonth">‹</button>
      <span>{{ currentMonth }}</span>
      <button @click="nextMonth">›</button>
    </div>
    <div class="days">
      <div v-for="day in days" :key="day" class="day">{{ day }}</div>
    </div>
    <div class="dates">
      <div
          v-for="date in dates"
          :key="date.toISOString()"
          :class="['date', { selected: isSelected(date) }]"
          @click="selectDate(date)"
      >
        {{ date.getDate() }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';

export default {
  name: 'Calendar',
  props: {
    modelValue: {
      type: Date,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedDate = ref<Date>(props.modelValue);

    const currentMonth = computed(() => {
      return selectedDate.value.toLocaleString('default', { month: 'long', year: 'numeric' });
    });

    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    const dates = computed(() => {
      const year = selectedDate.value.getFullYear();
      const month = selectedDate.value.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const dates = [];

      for (let i = 1; i <= lastDay.getDate(); i++) {
        dates.push(new Date(year, month, i));
      }

      return dates;
    });

    const isSelected = (date: Date) => {
      return date.toDateString() === selectedDate.value.toDateString();
    };

    const selectDate = (date: Date) => {
      selectedDate.value = date;
      emit('update:modelValue', date);
    };

    const prevMonth = () => {
      const newDate = new Date(selectedDate.value);
      newDate.setMonth(newDate.getMonth() - 1);
      selectedDate.value = newDate;
    };

    const nextMonth = () => {
      const newDate = new Date(selectedDate.value);
      newDate.setMonth(newDate.getMonth() + 1);
      selectedDate.value = newDate;
    };

    return {
      selectedDate,
      currentMonth,
      days,
      dates,
      isSelected,
      selectDate,
      prevMonth,
      nextMonth,
    };
  },
};
</script>

<style scoped>
.calendar {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  display: flex;
  justify-content: space-between;
  width: 90%;
}
.days,
.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;

}
.date {
  cursor: pointer;
  padding: 10px 13px;
  text-align: center;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover{
    background-color: #434343;
  }
}
.day {
  padding: 10px;
}
.selected {
  background-color: #D42929;
  color: white;
}
</style>