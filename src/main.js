// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // El archivo que configuramos antes

const app = createApp(App)
app.use(router) // ¡Esto es vital!
app.mount('#app')