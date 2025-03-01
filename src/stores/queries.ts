import { defineStore } from 'pinia'
import authAPI from "@/utils/authAPI.ts";
import {useNotificationStore} from "@/stores/notification.ts";
import type {JqlQuery} from "@/types";
import {ref} from "vue";


export const useQueriesStore = defineStore('queries', () => {

    const ntfStore = useNotificationStore()

    const loadPending = ref<boolean>(false);
    const loaMorePending = ref<boolean>(false);
    const hasMoreQueries = ref<boolean | null>(null);

    const queries = ref<JqlQuery[] | null>(null);

    const getQueries = async (page: number, limit: number, withoutPending?: boolean) => {

        let currentPending = page === 1 ? loadPending : loaMorePending;

        hasMoreQueries.value = null;

        if(!withoutPending){
            currentPending.value = true;
        }

        try {
            const response = await authAPI.get('/query', {params: {page, limit}})

            if (response.status === 200 && response.data) {
                hasMoreQueries.value = response.data.hasMore;

                if (page === 1) {
                    queries.value = response.data.queries;
                } else if (page >= 2 && queries.value){
                    queries.value.push(...response.data.queries);
                }
            }
        } catch (e: any) {
            ntfStore.addNotification('error', 'Произошла ошибка при получении запросов, попробуйте позже', 3000)
            console.error(e);
        } finally {
            if(!withoutPending){
                currentPending.value = false;
            }
        }
    };

    const createPending = ref<boolean>(false);

    const createJqlQuery = async (name: string, query: string, fields?: string[]) => {
        try {
            createPending.value = true;
            const response = await authAPI.post('/query', { name, query, fields });

            if (response.status === 201 && response.data.query) {
                queries.value?.unshift(response.data.query);
                ntfStore.addNotification('success', 'Запрос успешно создан', 3000);
            }
        } catch (err: any) {
            ntfStore.addNotification('error', 'Произошла ошибка при создании запроса, попробуйте позже', 3000);
            console.error('Ошибка при создании запроса');
        }finally{
            createPending.value = false;
        }
    };

    const deleteJqlQuery = async (queryId: string) => {
        try {
            const response = await authAPI.delete(`/query/${queryId}`);

            if (response.status === 200 && queries.value) {
                queries.value = queries.value?.filter(query => query._id !== queryId);
                ntfStore.addNotification('success', 'Запрос успешно удален', 3000);
            }
        } catch (err: any) {
            ntfStore.addNotification('error', 'Произошла ошибка при удалении запроса, попробуйте позже', 3000);
            console.error('Ошибка при удалении запроса');
        }
    };

    const checkJqlQueryFlag = ref<boolean>(false)
    const checkJqlQueryData = ref<any>(null); // тк нельзя знать точно узнать стр-ру ответа - то просто any

    const checkJqlQuery = async (jqlQuery: string, fields?: string[]) => {
        try {
            const response = await authAPI.post('/query/check', { jqlQuery, fields });

            checkJqlQueryFlag.value = response.status === 200;

            if (response.data){
                checkJqlQueryData.value = response.data.data
            }
        } catch (err: any) {
            if (err.response.data){
                checkJqlQueryData.value = err.response.data.data
            }
            if (err.response.status !== 400){
                ntfStore.addNotification('error', 'Произошла ошибка при проверке запроса, попробуйте позже', 3000);
            }
            console.error('Ошибка при проверке запроса', err);
        }
    };

    const clearQueryEditorData = () => {
        checkJqlQueryFlag.value = false;
        checkJqlQueryData.value = null;
    }

    const getJqlQueryById = async (queryId: string) => {
        try {
            const response = await authAPI.get(`/query/${queryId}`);

            if (response.status === 200 && response.data.query) {
                return response.data.query;
            }
        } catch (err: any) {
            if (err.response.status !== 400){
                ntfStore.addNotification('error', 'Произошла ошибка при получении запроса, попробуйте позже', 3000);
            }
            console.error('Ошибка при получении запроса', err);
        }
    };



    return{
        loadPending,
        loaMorePending,
        hasMoreQueries,
        queries,
        getQueries,
        createPending,
        createJqlQuery,
        deleteJqlQuery,
        getJqlQueryById,
        checkJqlQueryFlag,
        checkJqlQueryData,
        clearQueryEditorData,
        checkJqlQuery
    }

})
