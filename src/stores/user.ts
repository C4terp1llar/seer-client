import { defineStore } from 'pinia'
import authAPI from "@/utils/authAPI.ts";
import {useNotificationStore} from "@/stores/notification.ts";

export const useUserStore = defineStore('user', () => {

    const ntfStore = useNotificationStore()

    const getUser = async () => {
        try {
            const response = await authAPI.get('/user')

            console.log(response.data)
        } catch (err: any) {
            ntfStore.addNotification('error', err.response.data.message, 3000)
            console.error('Ошибка при получении данных о пользователе:', err);
        }
    };

    return{
        getUser
    }

})
