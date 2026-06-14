<template>
  <div class="w-full flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 px-6">
    <!-- Spinner -->
    <div class="relative flex items-center justify-center mb-6">
      <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-indigo-200"></div>
      <div
        class="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-t-indigo-700 border-r-transparent border-b-transparent border-l-transparent animate-spin"
      ></div>
    </div>

    <!-- Title -->
    <h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-indigo-900 mb-2">
      {{ t('loading') }}
    </h2>

    <!-- Skeleton lines -->
    <div class="w-full max-w-md space-y-3">
      <div class="h-3 bg-indigo-100 rounded-full animate-pulse"></div>
      <div class="h-3 bg-indigo-100 rounded-full animate-pulse w-5/6 mx-auto"></div>
      <div class="h-3 bg-indigo-100 rounded-full animate-pulse w-4/6 mx-auto"></div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
