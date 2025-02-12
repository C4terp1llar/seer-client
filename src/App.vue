<script setup lang="ts">
import Notifications from "@/components/notifications.vue";
import {useAppThemeStore} from "@/stores/theme.ts";

const themeStore = useAppThemeStore()
</script>

<template>
  <v-app theme="dark">
    <router-view/>
    <notifications/>
  </v-app>
</template>

<style scoped lang="scss">

</style>
