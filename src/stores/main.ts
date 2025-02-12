import { defineStore } from 'pinia'
import authAPI from "@/utils/authAPI.ts";
import {useNotificationStore} from "@/stores/notification.ts";
import {useUserStore} from "@/stores/user.ts";
import type {IssuesShortStats} from "@/types";
import {ref} from "vue";


export const useMainStore = defineStore('main', () => {

    const ntfStore = useNotificationStore()

    const issuesStats = ref<IssuesShortStats | null>(null);
    const pendingIssuesStats = ref<boolean>(false)

    const getIssuesStats = async (project: string) : Promise<IssuesShortStats | void> => {
        try {
            pendingIssuesStats.value = true

            const response = await authAPI.get('/issue', {params: {project}})

            if (response.data && response.status === 200) {
                issuesStats.value = response.data.issues
                return response.data.issues
            }
        } catch (err: any) {
            ntfStore.addNotification('error', 'Произошла ошибка при получении статистики задач, попробуйте позже', 3000)
            console.error('Ошибка при получении статистики задач:', err);
        }finally {
            pendingIssuesStats.value = false
        }
    };


    return{
        getIssuesStats,
        issuesStats,
        pendingIssuesStats,
    }

})
