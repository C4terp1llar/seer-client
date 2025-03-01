<script setup lang="ts">
import {useWidgetsStore} from "@/stores/widgets.ts";
import {onMounted, ref} from "vue";
import NoteWidgetSkeleton from "@/components/loaders/noteWidgetSkeleton.vue";
import type {WidgetNote} from "@/types";
import NoteEditor from "@/components/widgets/noteEditor.vue";

const widgetsStore = useWidgetsStore();

const pending = ref<boolean>(false)
const note = ref<WidgetNote | null>(null)

onMounted(async () => {
  pending.value = true;
  const result = await widgetsStore.getNote();
  pending.value = false;
  note.value = result ?? null;
})
</script>

<template>
  <div class="note-widget__wrapper">
    <note-widget-skeleton v-if="pending"/>

    <note-editor @note-created="n => note = n" :note="note" v-if="!pending"/>
  </div>
</template>

<style scoped lang="scss">
.note-widget__wrapper{
  height: 300px;
  min-width: 500px;
  max-width: 600px;

  border-radius: 10px;
  background: #434343;
  display: flex;
  flex-direction: column;
}
</style>