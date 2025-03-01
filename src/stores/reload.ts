import { defineStore } from 'pinia'
import {ref} from "vue";

export const useReloadStore = defineStore('reload', () => {

    const reloadKey = ref<number>(Math.random())

    const handReload = () => {
        reloadKey.value = Math.random()
    }

    return{
        reloadKey,
        handReload
    }

})
