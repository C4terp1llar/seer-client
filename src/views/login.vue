<script setup lang="ts">
import LoginFormWrap from "@/components/login/loginFormWrap.vue";

</script>

<template>
  <div class="login-page__wrapper">
    <login-form-wrap/>
  </div>
</template>

<style scoped lang="scss">
.login-page__wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url("../assets/img/login-bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>