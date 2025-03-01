<script setup lang="ts">
import {ref} from "vue";
import {rules} from "@/helpers/inputValidation.ts";
import {replaceSpaces} from "@/helpers/replaceSpaces.ts";
import type {EmojiExt} from "vue3-emoji-picker";
import V3Picker from "@/components/v3Picker.vue";

interface Props{
  title: string;
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'updateText', val: string): void
}>();

const text = ref<string>(props.title)
const isPickerVisible = ref<boolean>(false);

const handleClosePicker = () => {
  setTimeout(() => {
    isPickerVisible.value = false;
  });
};

const handleSelect = (emoji: EmojiExt) => {
  text.value += emoji.i
  emit('updateText', text.value.trim());
};

const handleInput = () => {
  emit('updateText', text.value.trim());
};
</script>

<template>
  <div class="create-query__text">

    <v-text-field
        label="Наименование"
        v-model.trim="text"
        variant="solo-filled"
        @input="handleInput"
        hide-details="auto"
        density="comfortable"
        maxlength="32"
    />

    <button class="create-query__action-btn" @click="isPickerVisible = !isPickerVisible">
      <img src="../../assets/img/smile.svg" alt="smile">
    </button>

    <v-scroll-y-transition>
      <div class="emoji-picker__wrapper" v-if="isPickerVisible">
        <v3-picker :is-short="true" @close="handleClosePicker" @select="handleSelect"/>
      </div>
    </v-scroll-y-transition>

  </div>
</template>

<style scoped lang="scss">
.create-query__text {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 10px;

  .create-query__action-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 5px;
    border: 1px solid rgba(105, 105, 105, 0.42);
    transition: .3s;
    margin-bottom: auto;
    background: #282828;

    &:hover{
      filter: drop-shadow(0 0 2px currentColor);
      background: #434343;
    }
  }
  .emoji-picker__wrapper{
    position: absolute;
    width: 250px;
    right: 0;
    top: 125%;
    z-index: 10;
  }
  img{
    width: 28px;
    height: 28px;
    object-fit: cover;
  }
}
</style>
