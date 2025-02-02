<script setup lang="ts">


import {useNotificationStore} from "@/stores/notification.ts";

const ntfStore = useNotificationStore();

const notificationMap = new Map([
  ['error', 'mdi-alert-octagon-outline'],
  ['warning', 'mdi-alert-outline'],
  ['success', 'mdi-check-circle-outline'],
  ['info', 'mdi-information-variant-circle-outline']
]);

const getIcon = (type: string) => {
  return notificationMap.get(type)
};
</script>

<template>

  <div v-if="ntfStore.notifications.length" class="notification-container">
    <div
        v-for="notification in ntfStore.notifications"
        :key="notification.id"
        :class="['notification', notification.type]"
    >
      <v-icon class="icon-type">{{ getIcon(notification.type) }}</v-icon>
      <span>{{ notification.message }}</span>
      <v-btn
          class="ml-auto"
          variant="plain"
          icon="mdi-close"
          @click="ntfStore.removeNotification(notification.id)"
      />
    </div>
  </div>

</template>

<style scoped lang="scss">

.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 1rem;
  z-index: 10005;

  @media (max-width: 650px) {
    bottom: unset;
    top: 0;
    width: 100%;
    max-width: unset;
  }
}

.__fr-ntf{
  padding: 0 !important;
  position: relative;

  .notification__avatar{
    z-index: 10006;
  }

  .notification-details{
    display: flex;
    flex-direction: column;

    .notification-details__nick{
      width: fit-content;
      z-index: 10006;
      font-weight: 600;
    }

    .notification-details__message{
      position: relative;
      font-size: 14px;
    }
  }

  @media (max-width: 650px) {
    padding: 5px !important;
  }
}

.hide__link{
  position: absolute;
  inset: 0;
}




.icon-type {
  outline: 2px solid currentColor;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 1px 20px currentColor;
  margin-right: 10px;
}

.notification {
  box-shadow: 0 1px 10px currentColor;
  border: 2px solid currentColor;
  border-radius: 15px;
  padding: 1rem;
  margin-bottom: 15px;
  display: flex;
  gap: 5px;
  align-items: center;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.3s ease forwards;
  background: rgb(var(--v-theme-background));

}


@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notification.success {
  border-color: #4caf50;
  color: #4caf50;
  //background: linear-gradient(180deg, rgba(76, 175, 80, 0.3) 0%, rgba(76, 175, 80, 0.1) 100%);
}

.notification.error {
  border-color: #f44336;
  color: #f44336;
  //background: linear-gradient(180deg, rgba(244, 67, 54, 0.3) 0%, rgba(244, 67, 54, 0.1) 100%);
}

.notification.warning {
  border-color: orange;
  color: orange;
  //background: linear-gradient(180deg, rgba(255, 165, 0, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
}

.notification.info {
  border-color: currentColor;
  color: currentColor;
  //background: linear-gradient(180deg, rgba(33, 150, 243, 0.3) 0%, rgba(33, 150, 243, 0.1) 100%);
}
</style>
