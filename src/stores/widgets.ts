import { defineStore } from 'pinia'
import authAPI from "@/utils/authAPI.ts";
import {useNotificationStore} from "@/stores/notification.ts";
import {ref} from "vue";
import type {WidgetNote} from "@/types";


export const useWidgetsStore = defineStore('widgets', () => {

    const ntfStore = useNotificationStore()

    const getNotePending = ref<boolean>(false)

    const getNote = async (): Promise<WidgetNote | null | void> => {
        try {
            getNotePending.value = true;
            const response = await authAPI.get(`/note`);

            if (response.status === 200 && response.data.note) {
                return response.data.note;
            }
        } catch (err: any) {
            if (err.response.status !== 400){
                ntfStore.addNotification('error', 'Произошла ошибка при получении заметки, попробуйте позже', 3000);
            }
            console.error('Ошибка при получении запроса', err);
        }finally{
            getNotePending.value = false;
        }
    };

    const createNote = async (content: string, title: string): Promise<WidgetNote | null | void> => {
        try {
            const response = await authAPI.post(`/note`, {content, title});

            if (response.status === 200 && response.data.note) {
                return response.data.note;
            }
            return null;
        } catch (err: any) {
            if (err.response.status !== 400){
                ntfStore.addNotification('error', 'Произошла ошибка при создании заметки, попробуйте позже', 3000);
            }
            console.error('Ошибка при получении запроса', err);
            return null;
        }
    };


    return{
        getNote,
        createNote,
        getNotePending
    }

})
