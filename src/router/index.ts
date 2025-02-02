import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'
import Dashboard from "@/views/dashboard.vue";
import {checkAuth} from "@/utils/checkAuth.ts";
import NotFound from "@/views/notFound.vue";
import General from "@/layouts/general.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/app',
      name: 'app',
      component: General,
      children: [
        {
          path: '',
          name: 'default-app',
          redirect: '/app/dashboard'
        },
        {
          path: '/app/dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/app/settings',
          name: 'settings',
          component: () => import('../views/settings.vue')
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = document.cookie.includes("JSESSIONID") && document.cookie.includes("atlassian.xsrf.token");

  if (to.path.startsWith('/app')) {
    if (!isAuthenticated) {
      next('/');
    } else {
      const isValid = await checkAuth();

      if (!isValid) {
        document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "atlassian.xsrf.token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        next('/');
      } else {
        next();
      }
    }
  } else {
    if (isAuthenticated) {
      const isValid = await checkAuth();

      if (isValid) {
        next('/app');
      } else {
        document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "atlassian.xsrf.token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        next();
      }
    } else {
      next();
    }
  }
});

export default router
