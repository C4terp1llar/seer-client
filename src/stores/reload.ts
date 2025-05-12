import { defineStore } from 'pinia'
import {computed, ref} from "vue";
import {useMainStore} from "@/stores/main.ts";
import {useQueriesStore} from "@/stores/queries.ts";
import {useWidgetsStore} from "@/stores/widgets.ts";

export const useReloadStore = defineStore('reload', () => {

    const mainStore = useMainStore();
    const queriesStore = useQueriesStore();
    const widgetsStore = useWidgetsStore();

    const reloadKey = ref<number>(Math.random())
    const reloadPending = ref<boolean>(false)

    const handReload = () => {
        reloadKey.value = Math.random();
        lastReload.value = new Date();
        reloadPending.value = true;
        setTimeout(() => reloadPending.value = false, 1000);
    }

    const lastReload = ref<Date>(new Date())

    const compositePending = computed(() => reloadPending.value && (mainStore.pendingIssuesStats || queriesStore.loadPending || widgetsStore.getNotePending || mainStore.getHPIssuePending));

    return{
        reloadKey,
        handReload,
        lastReload,
        compositePending
    }

})
