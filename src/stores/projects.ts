import { defineStore } from 'pinia'
import authAPI from "@/utils/authAPI.ts";
import {useNotificationStore} from "@/stores/notification.ts";

export const useProjectsStore = defineStore('projects', () => {

    const ntfStore = useNotificationStore()

    const getIssues = async (projectKey: string) => {
        try {
            const response = await authAPI.get(`/project/${projectKey}/issue`)

            console.log(response.data)
        } catch (err: any) {
            ntfStore.addNotification('error', err.response.data.message, 3000)
            console.error('Ошибка при получении общей статистики задач по проекту:', err);
        }
    };

    return{
        getIssues
    }

})
