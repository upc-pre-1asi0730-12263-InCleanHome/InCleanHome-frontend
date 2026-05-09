<script setup>
import { ref } from 'vue'
import WorkerListView    from '@/Search-and-catalog/presentation/views/WorkerListView.vue'
import WorkerProfileView from '@/Booking/presentation/views/WorkerProfileView.vue'

const currentView    = ref('search') // 'search' | 'profile'
const selectedWorker = ref(null)

function onSelectWorker(worker) {
  selectedWorker.value = worker
  currentView.value = 'profile'
}

function onBack() {
  currentView.value = 'search'
  selectedWorker.value = null
}
</script>

<template>
  <WorkerListView
    v-if="currentView === 'search'"
    @select-worker="onSelectWorker"
  />
  <WorkerProfileView
    v-else-if="currentView === 'profile' && selectedWorker"
    :worker="selectedWorker"
    @back="onBack"
  />
</template>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #f7fafc;
}
</style>
