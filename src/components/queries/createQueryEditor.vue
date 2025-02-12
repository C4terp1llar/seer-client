<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import {onClickOutside} from "@vueuse/core";
import CreateQueryName from "@/components/queries/createQueryName.vue";


interface Props {
  mode: 'create' | 'view'
}

const props = defineProps<Props>();

const editorRef = ref<HTMLElement | null>(null);
const router = useRouter()

onClickOutside(editorRef, e => handleClose())

const handleClose = () => {
  if (props.mode === 'create') {
    router.push({query: {queryEditor: undefined}});
  }else{
    router.push({query: {queryView: undefined}});
  }
}

const title = ref<string>('');
const jql = ref<string>('');
</script>

<template>
  <div class="create-query-editor" ref="editorRef">
    <button @click="handleClose" class="close__btn">
      <v-icon :size="24" >mdi-close</v-icon>
    </button>

    <h4 class="text-center mb-2">Конструктор</h4>

    <create-query-name :title="title" @update-text="val => title = val"/>

    <div class="jql-text">
      <v-textarea
          label="Data source (JQL)"
          class="h-100"
          rows="10"
          variant="solo-filled"
          v-model="jql"
          hide-details="auto"
          no-resize
      />
    </div>

    <div class="create-query-editor__controls">

      <v-btn class="text-none" variant="outlined">Проверить</v-btn>

      <div class="__controls-submit">
        <v-btn class="text-none" variant="outlined" @click="jql = ''">Сброс</v-btn>
        <v-btn class="text-none btn__base" variant="tonal">Готово</v-btn>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.create-query-editor{
  min-height: 45vh;
  width: 700px;
  box-shadow: 0 0 5px currentColor;
  background: rgb(var(--v-theme-background));
  position: relative;
  border-radius: 10px;
  padding: 10px;

  .close__btn{
    position: absolute;
    right: 0;
    top: 0;
  }

  .jql-text{
    margin: 10px 0;
    height: 100%;
  }

  .create-query-editor__controls{
    display: flex;
    justify-content: space-between;
    .__controls-submit{
      display: flex;
      gap: 10px;
    }
  }
}
</style>