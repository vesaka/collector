import './style.css';
import { createApp } from 'vue';
import env from './bootstrap/env';
import router from './bootstrap/router';
import pinia from './bootstrap/pinia';


import App from './App.vue';

createApp(App)
        .use(env)
        .use(router)
        .use(pinia)
        .mount('#app');