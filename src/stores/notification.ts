import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {Notification} from "@/types";

type AddNotificationParams = Omit<Notification, 'id'>;

export const useNotificationStore = defineStore('notification', () => {

    const notifications = ref<Notification[]>([]);

    const addNotification = (type: 'success' | 'error' | 'info' | 'warning', message: string, timeout: number = 5000) => {
        const id = Date.now() + Math.random();
        notifications.value.push({
            id,
            type,
            message,
            timeout,
        });

        setTimeout(() => {
            removeNotification(id);
        }, timeout);
    };

    const removeNotification = (id: number) => {
        notifications.value = notifications.value.filter(n => n.id !== id);
    };

    return {
        notifications,
        addNotification,
        removeNotification
    };
});
