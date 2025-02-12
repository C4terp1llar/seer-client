<script setup lang="ts">
import type {JqlQuery} from "@/types";

interface Props {
  q: JqlQuery
}

const props = defineProps<Props>();
</script>

<template>
  <div class="queries-item__wrapper">
    {{q}}
  </div>
</template>

<style scoped lang="scss">
.queries-item__wrapper{

}
</style>