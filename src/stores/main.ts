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

    const getHPIssue = async (project: string, index: number)  => {
        try {
            const response = await authAPI.get('/HPIssues/index', {params: {project, index}})

            if (response.data && response.status === 200) {
                return response.data
            }
        } catch (err: any) {
            ntfStore.addNotification('error', 'Произошла ошибка при получении задачи с высоким приоритетом, попробуйте позже', 3000)
            console.error('Ошибка при получении задачи с высоким приоритетом:', err);
        }
    };

    return{
        getIssuesStats,
        issuesStats,
        pendingIssuesStats,
        getHPIssue
    }

})
