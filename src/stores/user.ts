import { defineStore } from 'pinia'
import authAPI from "@/utils/authAPI.ts";
import {useNotificationStore} from "@/stores/notification.ts";
import {ref} from "vue";
import type {User} from "@/types";

export const useUserStore = defineStore('user', () => {

    const ntfStore = useNotificationStore()

    const userData = ref<User | null>(null)

    const getUser = async () => {
        try {
            const response = await authAPI.get('/user')

            if (response.data && response.status === 200) {
                userData.value = response.data.user;
            }
        } catch (err: any) {
            ntfStore.addNotification('error', err.response.data.message, 3000)
            console.error('Ошибка при получении данных о пользователе:', err);
        }
    };

    return{
        getUser,
        userData
    }

})
