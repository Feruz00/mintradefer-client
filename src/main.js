import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'

import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

import progressBar from './includes/progress-bar'
import i18n from './includes/i18n'

import router from './router/'

import 'nprogress/nprogress.css'

import Toaster from 'vue-sonner'
import 'vue-sonner/style.css'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
})

const app = createApp(App)
app.use(createPinia())
app.use(VueQueryPlugin, queryClient)
progressBar(router)
app.use(router)
app.use(i18n)

app.component('Toaster', Toaster)

app.mount('#app')
