import { defineStore } from 'pinia'
import baseAPI from "@/utils/baseAPI.ts";
import {useNotificationStore} from "@/stores/notification.ts";
import {useRouter} from "vue-router";

export const useAuthStore = defineStore('auth', () => {

  const router = useRouter();
  const ntfStore = useNotificationStore()

  const login = async (username: string, password: string) => {
    try {
      const response = await baseAPI.get('/login', {
        params: { username, password }
      });

      const { cookies } = response.data;

      if (cookies) {
        document.cookie = `JSESSIONID=${cookies["JSESSIONID"]}; path=/; Secure; SameSite=None`;
        document.cookie = `atlassian.xsrf.token=${cookies["atlassian.xsrf.token"]}; path=/; Secure; SameSite=None`;
      }

      if (response.status === 200) {
        await router.push('/app');
      }

    } catch (err: any) {
      if (err.response.status === 401) {
        ntfStore.addNotification('error', 'Неверный логин или пароль!', 3000)
      }
      ntfStore.addNotification('error', err.response.data.error, 3000)
      console.error('Ошибка при авторизации:', err);
    }
  };

  const logout = async () => {
    document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "atlassian.xsrf.token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    await router.push('/')
  }

  return{
    login,
    logout
  }

})
