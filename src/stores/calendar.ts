import { defineStore } from 'pinia'
import authAPI from "@/utils/authAPI.ts";
import {useNotificationStore} from "@/stores/notification.ts";
import type {Event, JqlQuery} from "@/types";
import {ref} from "vue";
import {format} from "date-fns";


export const useCalendarStore = defineStore('calendar', () => {

    const ntfStore = useNotificationStore()

    const selectedDay = ref<Date | null>(null);
    const createPending = ref<boolean>(false);
    const createEvent = async (day: Date, time_from: string, time_to: string, title: string, color: string, description?: string) => {
        try {
            createPending.value = true;
            const response = await authAPI.post('/event', { day, time_from, time_to, title, color, description });

            if (response.data && response.status === 201) {
                ntfStore.addNotification('success', 'Событие успешно создано!', 3000);
                return response.data.event;
            }

        } catch (err: any) {
            if (err.response.error){
                ntfStore.addNotification('error', err.response.error, 3000);
            }
            if (err.response.status !== 400){
                ntfStore.addNotification('error', 'Произошла ошибка при создании события, попробуйте позже', 3000);
            }
            console.error('Ошибка при создании события', err);
        }finally {
            createPending.value = false;
        }
    };

    const loadPending = ref<boolean>(false);
    const loaMorePending = ref<boolean>(false);
    const hasMoreEvents = ref<boolean | null>(null);

    const page = ref<number>(1);
    const LIMIT = 10;

    const events = ref<Event[] | null>(null);

    const getEventsByDay = async (day: Date, withoutPending?: boolean) => {
        let currentPending = page.value === 1 ? loadPending : loaMorePending;

        try {
            hasMoreEvents.value = null;

            if(!withoutPending){
                currentPending.value = true;
            }

            const response = await authAPI.get('/event', {params: {day: format(day, 'yyyy-MM-dd'), page: page.value, limit: LIMIT}});

            if (response.data && response.status === 200) {
                hasMoreEvents.value = response.data.hasMore;

                if (page.value === 1) {
                    events.value = response.data.events;
                } else if (page.value >= 2 && events.value){
                    events.value.push(...response.data.events);
                }
                page.value++;
            }

        } catch (err: any) {
            if (err.response.status !== 400){
                ntfStore.addNotification('error', 'Произошла ошибка при получении событий, попробуйте позже', 3000);
            }
            console.error('Ошибка при создании события', err);
        }finally{
            if(!withoutPending){
                currentPending.value = false;
            }
        }
    };

    const selectDay = async (day: Date, wp?: boolean) => {
        events.value = null;
        page.value = 1;
        selectedDay.value = day;
        await getEventsByDay(day, wp);
    }

    const monthsEvents = ref<string[] | null>([]);
    const monthsEventsPending = ref<boolean>(false);

    const getMonthsEvents = async (withoutPending?: boolean) => {
        try {
            if (!withoutPending) monthsEventsPending.value = true;

            const response = await authAPI.get('/event/months');

            if (response.data && response.status === 200) {
                monthsEvents.value = response.data.schedule
            }

        } catch (err: any) {
            if (err.response.status !== 400){
                ntfStore.addNotification('error', 'Произошла ошибка при получении расписания событий, попробуйте позже', 3000);
            }
            console.error('Ошибка при получении расписания событий', err);
        }finally {
            monthsEventsPending.value = false;
        }
    };


    return{
        selectedDay,
        loadPending,
        loaMorePending,
        hasMoreEvents,
        events,
        selectDay,
        getEventsByDay,
        createEvent,
        createPending,
        monthsEvents,
        monthsEventsPending,
        getMonthsEvents,
    }

})
