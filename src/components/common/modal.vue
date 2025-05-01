<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {lockScroll, unlockScroll} from "@/helpers/modalScroll.ts";
import {onClickOutside} from "@vueuse/core";

defineProps<{ modelValue: boolean }>();

const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
};

const modalContentRef = ref(null);
onClickOutside(modalContentRef, close);

onMounted(() => lockScroll())
onUnmounted(() => unlockScroll())
</script>

<template>
  <Teleport to=".v-application__wrap">
    <div class="modal__wrapper __fade minimalistic_scroll" v-if="modelValue">
      <div ref="modalContentRef">
        <slot @close="close()" />
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal__wrapper {
  position: fixed;
  inset: 0;
  z-index: 10003;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  overflow-y: auto;
  padding: 10px 0;
}
</style>