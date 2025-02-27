<script setup lang="ts">
import {useRouter} from "vue-router";
import {computed, onUnmounted, ref} from "vue";
import {onClickOutside} from "@vueuse/core";
import CreateQueryName from "@/components/queries/createQueryName.vue";
import {useQueriesStore} from "@/stores/queries.ts";
import JqlResponseViewer from "@/components/queries/jqlResponseViewer.vue";
import type {JqlQuery} from "@/types";

interface Props {
  mode: 'create' | 'view',
  q?: JqlQuery | null
}

const props = defineProps<Props>();

const queriesStore = useQueriesStore()

const editorRef = ref<HTMLElement | null>(null);
const router = useRouter()

onClickOutside(editorRef, e => handleClose())
const handleClose = () => {
  if (props.mode === 'create') {
    router.push({query: {queryEditor: undefined}});
  } else {
    router.push({query: {queryView: undefined}});
  }
}

const handleClear = () => {
  jql.value = '';
  fields.value = '';
  firstLoadExceed.value = false;
  queriesStore.clearQueryEditorData()
}

onUnmounted(() => queriesStore.clearQueryEditorData());

const title = ref<string>(props.q?.name || '');
const jql = ref<string>(props.q?.query || '');
const fields = ref<string>(props.q?.fields ? props.q?.fields.join(', ') : '');

const formattedFields = computed(() => {
  if (fields.value) {
    return fields.value.split(' ')
  }
})

const checkPending = ref<boolean>(false);
const firstLoadExceed = ref<boolean>(false);

const checkQuery = async () => {
  if (!jql.value) return;
  checkPending.value = true;
  await queriesStore.checkJqlQuery(jql.value, formattedFields.value);
  checkPending.value = false;
  firstLoadExceed.value = true;
}

const createQuery = async () => {
  if (!jql.value || !title.value || checkPending.value || !queriesStore.checkJqlQueryFlag || !queriesStore.checkJqlQueryData) return;

  handleClose()
  await queriesStore.createJqlQuery(title.value, jql.value, formattedFields.value);
}
</script>

<template>
  <div class="create-query-editor" ref="editorRef">
    <button @click="handleClose" class="close__btn">
      <v-icon :size="24">mdi-close</v-icon>
    </button>

    <h4 class="text-center mb-2">{{ q ? q.name : 'Конструктор' }}</h4>

    <create-query-name v-if="mode === 'create'" :title="title" @update-text="val => title = val"/>

    <div class="jql-text">
      <v-textarea
          label="Data source (JQL)"
          class="h-100"
          rows="8"
          variant="solo-filled"
          v-model="jql"
          hide-details="auto"
          no-resize
          :disabled="mode === 'view'"
      />

      <div class="jql-text__fields" v-if="mode === 'create' || (q && q.fields.length)">
        <span v-if="mode === 'create'" class="jql-text__fields__info">Поле Fields предназначено для вывода сложных структур данных.</span>
        <v-textarea
            label="Fields (Необязательно)"
            placeholder="Наименования полей через пробел"
            rows="1"
            variant="solo-filled"
            v-model.trim="fields"
            hide-details="auto"
            no-resize
            clearable
            :disabled="mode === 'view'"
        />
        <v-fade-transition>
          <div class="formatted-fields" v-if="formattedFields">
            <span>{{ formattedFields }}</span>
          </div>
        </v-fade-transition>
      </div>
    </div>


    <v-scroll-y-transition>
      <div class="jql-text__response" v-if="q || queriesStore.checkJqlQueryData">
        <jql-response-viewer :data="q?.result || queriesStore.checkJqlQueryData"
                             :status="mode === 'create' ? (queriesStore.checkJqlQueryFlag ? 'success' : 'error') : 'success'"/>
      </div>
    </v-scroll-y-transition>

    <div :class="`create-query-editor__controls ${mode}`">
      <div class="__control-check" v-if="mode === 'create'">
        <v-btn @click="checkQuery" :disabled="checkPending" :loading="checkPending" class="text-none" variant="outlined">
          Проверить
        </v-btn>
        <v-icon
            :color="queriesStore.checkJqlQueryFlag ? 'green' : 'red'"
            v-if="!checkPending && firstLoadExceed"
        >
          {{ queriesStore.checkJqlQueryFlag ? 'mdi-check-circle-outline' : 'mdi-alert-circle-outline' }}
        </v-icon>
      </div>

      <div class="__controls-submit">
        <v-btn class="text-none" variant="outlined" @click="handleClear" v-if="mode === 'create'">Сброс</v-btn>
        <v-btn class="text-none btn__base" variant="tonal" @click="mode === 'create' ? createQuery() : handleClose()">Готово</v-btn>
      </div>
    </div>

  </div>
</template>


<style scoped lang="scss">
.create-query-editor {
  width: 700px;
  background: rgb(var(--v-theme-background));
  position: relative;
  border-radius: 10px;
  padding: 10px;

  .close__btn {
    position: absolute;
    right: 0;
    top: 0;
  }

  .jql-text {
    margin: 10px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .formatted-fields {
      padding: 5px;
      background: #282828;
      border-radius: 5px 5px 10px 10px;
      span{
        font-size: 14px;
        word-wrap: break-word;
        word-break: break-word;
      }
    }
  }

  .create-query-editor__controls {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    &.view{
      justify-content: center;
    }

    .__control-check{
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .__controls-submit {
      display: flex;
      gap: 10px;
    }
  }
}
.jql-text__fields__info{
  font-size: 12px;
  opacity: .8;
  margin-left: 5px;
}
</style>