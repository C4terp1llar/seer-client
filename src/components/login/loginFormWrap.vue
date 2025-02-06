<script setup lang="ts">

import LoginForm from "@/components/login/loginForm.vue";
</script>

<template>
  <div class="login-form__wrapper">
    <div class="logo">
      <img src="/img/logo-auth.svg">
    </div>

    <h2 class="text-center mb-3">Добро пожаловать</h2>

    <login-form/>

    <span class="mt-3 text-center opacity-80 reg__info">Регистрация возможна только через <strong>Jira</strong></span>
  </div>
</template>

<style scoped lang="scss">
.login-form__wrapper {
  margin: 5px;
  width: 500px;
  padding: 25px 40px;
  border-radius: 20px;
  border: 1px solid dimgrey;
  background: rgb(var(--v-theme-background));

  display: flex;
  flex-direction: column;
  justify-content: center;

  .logo {
    display: flex;
    justify-content: center;
    img {
      width: 100px;
      height: 100px;
    }
  }

  .reg__info{
    font-size: 14px;
  }
}
</style>