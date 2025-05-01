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

            const response = await authAPI.get('/issues-stats', {params: {project}})

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

    const getPaginatedIssues = async (project: string, startAt: number = 0, maxResults: number = 20, issueKeyFilter: string = '') => {
        try {
            const response = await authAPI.get('/issues', {
                params: {
                    project,
                    startAt,
                    maxResults,
                    issueKey: issueKeyFilter
                }
            });

            if (response.data && response.status === 200) {
                return response.data;
            }
        } catch (err: any) {
            ntfStore.addNotification('error', 'Произошла ошибка при получении задач, попробуйте позже', 3000);
            console.error('Ошибка при получении задач:', err);
        }
    };

    const setPinIssue = async (key: string) => {
        try {
            const response = await authAPI.post('/pin-issue', {key})

            if (response.data && response.status === 200) {
                return response.data;
            }
        } catch (err: any) {
            ntfStore.addNotification('error', 'Произошла ошибка при закреплении задачи, попробуйте позже', 3000);
            console.error('Ошибка при закреплении задачи:', err);
        }
    };

    const getPinIssue = async () => {
        try {
            const response = await authAPI.get('/pin-issue')

            if (response.data && response.status === 200) {
                return response.data;
            }
        } catch (err: any) {
            ntfStore.addNotification('error', 'Произошла ошибка при получении закрепленной задачи, попробуйте позже', 3000);
            console.error('Ошибка при получении закрепленной задачи:', err);
        }
    };

    return{
        getIssuesStats,
        issuesStats,
        pendingIssuesStats,
        getHPIssue,
        getPaginatedIssues,
        setPinIssue,
        getPinIssue
    }

})
