import { defineStore } from 'pinia'
import authAPI from "@/utils/authAPI.ts";
import {useNotificationStore} from "@/stores/notification.ts";
import {useUserStore} from "@/stores/user.ts";


export const useSettingsStore = defineStore('settings', () => {

    const ntfStore = useNotificationStore()
    const uStore = useUserStore()

    const getProjects = async () : Promise<string[] | void> => {
        try {
            const response = await authAPI.get('/project')

            if (response.data && response.status === 200) {
                return response.data.projects
            }

        } catch (err: any) {
            ntfStore.addNotification('error', 'Произошла ошибка при получении проектов, попробуйте позже', 3000)
            console.error('Ошибка при получении проектов:', err);

        }
    };

    const setProject = async (newProject: string | null) => {
        try {
            const response = await authAPI.post('/project', {project: newProject})

            if (response.data && response.status === 200) {
                uStore.userData = response.data.user;
                return response.data.user;
            }

        } catch (err: any) {
            ntfStore.addNotification('error', 'Произошла ошибка при получении проектов, попробуйте позже', 3000)
            console.error('Ошибка при получении проектов:', err);
        }
    };

    return{
        getProjects,
        setProject
    }

})
