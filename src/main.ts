import '@mdi/font/css/materialdesignicons.css'
import './assets/css/main.scss'
import './assets/css/base.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {autoAnimatePlugin} from '@formkit/auto-animate/vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(autoAnimatePlugin)

app.mount('#app')
