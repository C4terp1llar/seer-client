import { defineStore } from 'pinia'
import baseAPI from "@/utils/baseAPI.ts";
import {useNotificationStore} from "@/stores/notification.ts";
import {useRouter} from "vue-router";
import {ref} from "vue";

export const useAuthStore = defineStore('auth', () => {

  const router = useRouter();
  const ntfStore = useNotificationStore()

  const authPending = ref<boolean>(false)

  const login = async (username: string, password: string) => {
    try {
      authPending.value = true;

      const response = await baseAPI.get('/login', {
        params: { username, password }
      });

      if (response.status === 200 && response.data) {
        document.cookie = `token=${response.data.token}; path=/; Secure; SameSite=None`;

        await router.push('/app');
        ntfStore.addNotification('success', response.data.message, 3000)
      }

    } catch (err: any) {
      if (err.response.status !== 500) {
        ntfStore.addNotification('error', err.response.data.message, 3000)
      }else{
        ntfStore.addNotification('error', err.response.data.error, 3000)
      }
      console.error('Ошибка при авторизации:', err);
    }finally {
      authPending.value = false;
    }
  };

  const logout = async () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    await router.push('/')
  }

  return{
    login,
    authPending,
    logout
  }

})
