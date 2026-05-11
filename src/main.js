import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import { searchRoutes } from './Search-and-catalog/search-routes.js'

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
