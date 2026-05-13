import { createApp } from 'vue';
import App from './App.vue';
import router from './User-Management/presentation/router/user-routes.js';
import './style.css';

createApp(App)
    .use(router)
    .mount('#app');