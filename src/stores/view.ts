import { defineStore } from 'pinia';
import {computed, ref} from 'vue';

type ViewMode = 'default' | 'extended';

const loadViewModeFromLocalStorage = (): ViewMode => {
    const saved = localStorage.getItem('appViewMode');
    return saved === 'extended' ? 'extended' : 'default';
};

const saveViewModeToLocalStorage = (mode: ViewMode) => {
    localStorage.setItem('appViewMode', mode);
};

export const useViewModeStore = defineStore('viewMode', () => {
    const currentViewMode = ref<ViewMode>(loadViewModeFromLocalStorage());

    const toggleViewMode = () => {
        currentViewMode.value = currentViewMode.value === 'default' ? 'extended' : 'default';
        saveViewModeToLocalStorage(currentViewMode.value);
    };

    const isDefaultViewMode = computed(() => currentViewMode.value === 'default');

    return {
        currentViewMode,
        toggleViewMode,
        isDefaultViewMode
    };
});
