<script setup lang="ts">

import LoginForm from "@/components/login/loginForm.vue";
</script>

<template>
  <div class="login-form__wrapper">
    <login-form/>
  </div>
</template>

<style scoped lang="scss">
.login-form__wrapper{
  margin: 5px;
  width: 400px;
  min-width: 200px;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid currentColor;
}
</style>