<script setup lang="ts">
import { computed } from "vue";
import JsonViewer from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

interface Props {
  data: any;
  status: "error" | "success";
  title?: string;
}

const props = defineProps<Props>();

const jsonData = computed(() => (props.data || {}));

const textColor = computed(() => (props.status === "error" ? "#ff6b6b" : "#a0e36b"));
</script>

<template>
  <div class="json-container styled-scroll__np">
    <h3 v-if="title" class="json-title" :style="{ color: textColor }">{{ title }}</h3>
    <json-viewer :data="jsonData" :deep="2" showLineNumber showLine showLength class="json-view" :style="{ color: textColor }" />
  </div>
</template>

<style scoped>
.json-container {
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 8px;
  font-family: monospace;
  max-width: 100%;
  overflow: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  max-height: 400px;
}

.json-title {
  font-size: 16px;
  margin-bottom: 8px;
}

.json-view {
  font-size: 14px;
}
</style>
