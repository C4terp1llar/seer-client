<script setup lang="ts">
import CreateAbstractTitle from "@/components/common/createAbstractTitle.vue";
import {computed, ref} from "vue";
import {useWidgetsStore} from "@/stores/widgets.ts";
import type {WidgetNote} from "@/types";
import {formatShortDate} from "@/helpers/dateFormat.ts";

const emit = defineEmits<{
  (e: 'noteCreated', note: WidgetNote | null): void;
}>()

interface Props {
  note: WidgetNote | null;
}
const props = defineProps<Props>();

const widgetsStore = useWidgetsStore();

const pending = ref<boolean>(false)
const changeNote = ref<boolean>(false)

const title = ref<string>(props.note?.title || '')
const content = ref<string>(props.note?.content || '');

const formattedContent = computed(() => {
  return props.note?.content ? props.note.content.replace(/\n/g, '<br />') : '';
});

const handleCreateNote = async () => {
  if (!title.value.length || !content.value.length) return;
  if (changeNote.value && ((title.value === props.note?.title) && (content.value === props.note?.content))) return;

  pending.value = true;
  const result = await widgetsStore.createNote(content.value, title.value);
  pending.value = false;
  emit('noteCreated', result ?? null);
  changeNote.value = false;
}
</script>

<template>
  <div class="note__wrapper __fade" v-if="!note || changeNote" >
    <div class="__create-offer __fade" v-if="!changeNote">
      <h3>У вас пока нет заметки <br> Запишем что-нибудь 🤗?</h3>
      <v-btn class="text-none btn__base mt-3" variant="tonal" @click="changeNote = true">Записать</v-btn>
    </div>

    <div class="__content-block __fade" v-else>
      <create-abstract-title @update-text="val => title = val" :title="title" />

      <v-textarea
          label="Текст"
          variant="solo-filled"
          v-model.trim="content"
          no-resize
          maxlength="512"
          counter
      />

      <div class="d-flex justify-center ga-3">
        <v-btn class="text-none" variant="outlined" :disabled="pending" @click="changeNote = false">Отмена</v-btn>
        <v-btn class="text-none btn__base" variant="tonal" :disabled="pending" :loading="pending" @click="handleCreateNote">Готово</v-btn>
      </div>
    </div>
  </div>

  <div class="note__wrapper __fade" v-else>
    <div class="__title-block">
      <h2 class="__title">
        {{note.title}}
      </h2>
      <v-btn icon variant="tonal" density="comfortable" @click="changeNote = true">
        <v-icon color="#f44336" :size="20">mdi-pencil</v-icon>
      </v-btn>
    </div>
    <div class="minimalistic_scroll overflow-y-auto">
      <span class="__content" v-html="formattedContent"></span>
    </div>
    <span class="__date">Записано {{ formatShortDate(note.updatedAt) }}</span>
  </div>
</template>

<style scoped lang="scss">
.note__wrapper{
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;

  .__content-block{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .__title-block{
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  .__create-offer{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    text-align: center;
  }
}

.__date {
  margin-top: auto;
  font-size: 12px;
  font-weight: 500;
  opacity: 0.8;
}
</style>