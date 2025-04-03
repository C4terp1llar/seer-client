<script setup lang="ts">
import CreateAbstractTitle from "@/components/common/createAbstractTitle.vue";
import {computed, ref} from "vue";
import ColorPicker from "@/components/common/colorPicker.vue";
import {useRouter} from "vue-router";
import {onClickOutside} from "@vueuse/core";
import EventPreview from "@/components/widgets/eventPreview.vue";
import {rules} from "@/helpers/inputValidation.ts";
import {useCalendarStore} from "@/stores/calendar.ts";
import {format} from "date-fns";
import type {Event} from "@/types";

const emit = defineEmits<{
  (e: 'close'): void
}>();

const calendarStore = useCalendarStore();

const title = ref<string>("");
const date = ref<string>(calendarStore.selectedDay ? format(calendarStore.selectedDay, 'yyyy-MM-dd') : "");
const timeFrom = ref<string>("");
const timeTo = ref<string>("");
const color = ref<string>("hsl(1, 100%, 50%)");
const description = ref<string>("");

const isValid = computed(() => {
  return (
      rules.required(title.value) === true &&
      rules.validDate(date.value) === true &&
      rules.validStartTime(timeFrom.value) === true &&
      rules.validEndTime(timeTo.value) === true &&
      rules.validTime(timeFrom.value, timeTo.value) === true
  );
});

const createEvent = async () => {
  if (!isValid.value) return;
  const event = await calendarStore.createEvent(new Date(date.value), timeFrom.value, timeTo.value, title.value, color.value, description.value);
  handleClose();
  if (event) await updateCalendar(event)
};
const updateCalendar = async (ev: Event) => {
  if (calendarStore.monthsEvents){
    if (!calendarStore.monthsEvents.includes(format(ev.day, "yyyy-MM-dd"))) {
      calendarStore.monthsEvents.push(format(ev.day, "yyyy-MM-dd"));
    }
  }else{
    calendarStore.monthsEvents = [format(ev.day, "yyyy-MM-dd")]
  }

  if (calendarStore.selectedDay && format(calendarStore.selectedDay, "yyyy-MM-dd") === format(ev.day, "yyyy-MM-dd")){
    await calendarStore.selectDay(calendarStore.selectedDay, true);
  }
}

const editorRef = ref<HTMLElement | null>(null);

onClickOutside(editorRef, e => handleClose())
const handleClose = () => {
  emit('close')
}

</script>

<template>
  <div class="event-editor__wrapper __fade" ref="editorRef">

    <button @click="handleClose" class="close__btn">
      <v-icon :size="24">mdi-close</v-icon>
    </button>

    <h4 class="text-center mb-2">Создание события</h4>

    <event-preview :title="title" :color="color" :description="description" :time-from="timeFrom" :time-to="timeTo"/>

    <color-picker @update-color="c => color = c"/>

    <create-abstract-title @update-text="t => title = t" :title="title"/>

    <v-textarea
        label="Краткое описание (Необязательно)"
        rows="2"
        variant="solo-filled"
        v-model.trim="description"
        no-resize
        maxlength="150"
        hide-details="auto"
    />

    <v-text-field
        type="date"
        variant="solo-filled"
        v-model.trim="date"
        label="День события"
        hide-details="auto"
        :rules="[rules.validDate(date)]"
    />

    <div class="__times">
      <v-text-field
          type="time"
          variant="solo-filled"
          v-model.trim="timeFrom"
          label="Время начала"
          :rules="[rules.validStartTime(timeFrom)]"
      />
      <v-text-field
          type="time"
          variant="solo-filled"
          v-model.trim="timeTo"
          label="Время окончания"
          :rules="[rules.validEndTime(timeTo)]"
      />
    </div>

    <small class="error__time" v-if="typeof rules.validTime(timeFrom, timeTo) === 'string' && timeFrom &&  timeTo && rules.validEndTime(timeTo) && rules.validEndTime(timeFrom)">{{rules.validTime(timeFrom, timeTo)}}</small>

    <div class="d-flex justify-center ga-3">
      <v-btn class="text-none" variant="outlined"  @click="emit('close')">Отмена</v-btn>
      <v-btn class="text-none btn__base" variant="tonal"  @click="createEvent">Готово</v-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.event-editor__wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 10px;
  border-radius: 10px;
  background: #282828;
  width: 500px;
  position: relative;
}

.close__btn {
  position: absolute;
  right: 0;
  top: 0;
}

.__times{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.error__time{
  text-align: center;
  color: rgb(207, 102, 121);
}

</style>
