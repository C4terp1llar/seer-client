<script setup lang="ts">
import {useRoute} from 'vue-router';
import {computed} from 'vue';
import DashboardSidebarIcon from "@/components/icons/dashboardSidebarIcon.vue";
import {useAuthStore} from "@/stores/auth.ts";

const authStore = useAuthStore();
const route = useRoute();

const isActive = (path: string) => computed(() => route.path.includes(`/app/${path}`));
</script>

<template>

  <nav class="navbar">

    <div class="logo">
      <img src="../assets/img/logo.svg">
      <RouterLink to="/app/dashboard"/>
    </div>

    <ul class="nav-menu">

      <li :class="['dashboard', { active: isActive('dashboard').value }]">
        <RouterLink to="/app/dashboard"/>
        <v-icon :size="30">mdi-view-dashboard</v-icon>
      </li>

      <li :class="['settings', { active: isActive('settings').value }]">
        <RouterLink to="/app/settings"/>
        <v-icon :size="30">mdi-cog</v-icon>
      </li>

      <li class="logout mt-auto">
        <button @click="authStore.logout"></button>
        <v-icon color="error" :size="30">mdi-logout</v-icon>
      </li>

    </ul>
  </nav>

</template>

<style scoped lang="scss">

.logo{
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 650px) {
    display: none;
  }

  img{
    width: 55px;
    height: 55px;
    object-fit: contain;
  }

  a {
    position: absolute;
    inset: 0;
    z-index: 10;
  }
}

.logout{
  position: relative;
  &:hover{
    background-color: rgba(197, 26, 26, 0.31) !important;
  }
  button{
    position: absolute;
    inset: 0;
    z-index: 10;
  }
}

.dashboard, .logout{
  border-top: 1px solid dimgray;
}
.dashboard, .settings{
  border-bottom: 1px solid dimgray;
}

.logout,
.dashboard,
.settings{
  @media (max-width: 650px) {
    border: 1px solid dimgray;
    border-radius: 5px;
  }
}

.logout{
  @media (max-width: 650px) {
    margin-left: auto;
  }
}

.navbar {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  justify-content: center;
  border-right: 1px solid dimgray;

  @media (max-width: 650px) {
    height: auto;
    padding: 10px 5px;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    top: unset;
    z-index: 10001;
    background: rgb(var(--v-theme-background));
    border-top: 1px solid dimgray;
  }
}

.nav-menu {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  height: 100%;
  padding: 0;
  flex-wrap: wrap;

  @media (max-width: 650px) {
    flex-direction: unset;
    gap: 5px;
  }

  li {
    position: relative;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: background-color 0.3s;
    outline-color: dimgray;

    @media (max-width: 650px) {
      padding: 5px 10px;
    }

    &:hover {
      background-color: #7777;
    }

    &.active {
      background-color: #7777;
    }

    a {
      position: absolute;
      inset: 0;
      z-index: 10;
    }
  }
}
</style>
