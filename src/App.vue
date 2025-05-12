<script setup lang="ts">

import Notifications from "@/components/notifications.vue";
</script>

<template>
  <v-app theme="dark">
    <router-view/>
    <notifications/>
  </v-app>
</template>

<style scoped lang="scss">

</style>
