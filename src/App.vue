<template>
  <VueQueryDevtools />
  <div class="h-screen w-screen flex items-center justify-center text-blue-500" v-if="isLoading">
    <!-- <LoadingOutlined class="text-4xl" /> -->
    <Loading />
  </div>
  <Error v-else-if="isError" />
  <div class="font-poppins" v-else>
    <RouterView />
  </div>
  <Toaster position="top-center" richColors />
</template>
<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import { usegetSite } from './services/useSite'
import Loading from './common/Loading.vue'
import Error from './common/Error.vue'
import { watch } from 'vue'
import useCompany from './stores/counter'

const { isLoading, isError, data } = usegetSite()
const company = useCompany()
watch(
  data,
  () => {
    if (data.value) {
      company.setCompany(data.value.data)
    }
  },
  { immediate: true },
)
</script>
