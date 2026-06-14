<template>
  <div
    class="w-full flex flex-col items-center justify-center text-center px-6 py-12 sm:py-16 lg:py-20"
  >
    <!-- Icon -->
    <div
      class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-6"
    >
      <WarningOutlined class="text-4xl sm:text-5xl text-indigo-700" />
    </div>

    <!-- Title -->
    <h2 class="text-xl sm:text-2xl lg:text-3xl font-semibold text-indigo-900 mb-3">
      {{ t('error_title') }}
    </h2>

    <!-- Message -->
    <p class="max-w-md text-sm sm:text-base text-indigo-700 leading-relaxed mb-6">
      {{ t('description') }}
    </p>

    <!-- Action Button (optional) -->
    <button
      v-if="retry"
      @click="$emit('retry')"
      class="px-6 py-2 sm:px-8 sm:py-3 rounded-xl bg-indigo-700 text-white font-medium hover:bg-indigo-800 transition-all duration-300 cursor-pointer"
    >
      {{ t('error_btn') }}
    </button>
  </div>
</template>

<script setup>
import { WarningOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
defineEmits(['retry'])
</script>
