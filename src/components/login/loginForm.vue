<script setup lang="ts">
import {ref} from "vue";
import {rules} from "@/helpers/inputValidation.ts";
import {useAuthStore} from "@/stores/auth.ts";
import {replaceSpaces} from "@/helpers/replaceSpaces.ts";


const authStore = useAuthStore();

const isPasswordVisible = ref<boolean>(false);

const password = ref<string>('');
const username = ref<string>('');

const pending = ref<boolean>(false);

const handleSubmit = async () => {
  if (rules.required(username.value) !== true || rules.required(password.value) !== true) return

  pending.value = true;
  await authStore.login(username.value, password.value);
  pending.value = false;
}

const handleInput = (val: string) => {
  return replaceSpaces(val)
}

</script>

<template>
    <v-form @submit.prevent="handleSubmit" class="qwe">
      <v-text-field
          id="login__username"
          class="mb-2"
          label="Логин"
          v-model.trim="username"
          :rules="[rules.required]"
          variant="outlined"
          @input="username = handleInput(username)"
          hide-details="auto"
      />

      <v-text-field
          id="login__password"
          label="Пароль"
          class="mb-2"
          v-model.trim="password"
          :rules="[rules.required]"
          variant="outlined"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="isPasswordVisible ? 'text' : 'password'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
          @input="password = handleInput(password)"
          hide-details="auto"
      />

      <v-btn
          id="login__enter-btn"
          type="submit"
          class="align-self-center text-none w-100"
          variant="outlined"
          :loading="pending"
          :disabled="pending"
          color="primary"
      >
        Войти
      </v-btn>

    </v-form>
</template>

<style scoped lang="scss">

</style>