<script setup lang="ts">
defineProps<{ modelValue: boolean }>();

const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <Teleport to=".v-application__wrap">
    <div class="modal__wrapper __fade" v-if="modelValue">
      <slot @close="close()"></slot>
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
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
}
</style>