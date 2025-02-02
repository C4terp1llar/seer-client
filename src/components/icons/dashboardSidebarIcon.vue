<script setup lang="ts">
defineProps<{
  width?: string;
  height?: string;
  color?: string;
}>();
</script>

<template>
  <svg
      :width="width || '28'"
      :height="height || '28'"
      :fill="color || 'currentColor'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
  >
    <path
        d="M6.77072 28.0713C6.77072 26.2598 5.30214 24.7911 3.49059 24.7911C1.67903 24.7911 0.210449 26.2598 0.210449 28.0713H6.77072Z"
        fill="currentColor"
    />
  </svg>
</template>
