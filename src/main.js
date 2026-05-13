import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'


import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { searchRoutes } from './Search-and-catalog/search-routes.js'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')


const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/catalog' },
    ...searchRoutes,
  ],
})

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')