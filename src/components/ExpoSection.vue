<template>
  <div class="mt-[5rem] mb-[5rem] xl:mt-[30rem] xl:mb-[120px] bg-indigo-100 h-full">
    <div v-if="isLoading" class="text-indigo-600 animate-pulse">Loading expo data...</div>
    <div v-else-if="isError" class="text-red-500">Failed to load expo data</div>

    <div v-else class="py-16 px-4 xl:px-[122px] grid gap-14 place-items-center">
      <div class="grid gap-8">
        <h1 class="font-semibold text-center cursor-default text-2xl xl:text-4xl">Expo-2025</h1>

        <p class="text-base xl:text-xl font-medium text-center text-textColor w-full xl:w-[60vw]">
          {{ getOutside(data.data, locale) }}
        </p>
      </div>

      <router-link
        :to="{ name: 'expo' }"
        class="py-3 px-8 xl:px-12 xl:py-4 transition-all duration-300 cursor-pointer place-items-center bg-[rgba(255,255,255,0.3)] backdrop-blur-[20px] rounded-2xl w-max border border-mainColor grid grid-cols-[max-content_max-content] gap-2"
      >
        <p class="text-lg font-semibold text-indigo-800">{{ t('extensive') }}</p>
        <ExportOutlined class="text-lg font-semibold text-indigo-800" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useGetExpo } from '@/services/useExpo'
import { getOutside } from '@/utils/getData'
import { ExportOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const { isLoading, data, isError } = useGetExpo()
</script>
