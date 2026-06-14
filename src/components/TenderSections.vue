<template>
  <div class="mb-[5rem] xl:mb-[120px] bg-indigo-800 h-full">
    <div class="py-16 px-4 xl:px-[122px] grid gap-7 xl:gap-14 place-items-center">
      <h1 class="font-semibold text-center text-white cursor-default text-2xl xl:text-4xl">
        {{ t('tenders') }}
      </h1>

      <div v-if="isLoading" class="text-indigo-600 animate-pulse">Loading tenders...</div>

      <!-- ERROR -->
      <div v-else-if="isError" class="text-red-500">Failed to load tenders</div>

      <div v-else class="grid grid-cols-1 xl:grid-cols-[max-content_max-content] gap-8">
        <TenderCard
          v-for="i in data.data"
          :key="i.id"
          :id="i.id"
          :title="getTitle(i, locale)"
          :content="getContent(i, locale)"
          :start-date="i.startDate"
          :end-date="i.endDate"
        />
      </div>

      <router-link
        :to="{ name: 'tender' }"
        class="px-12 py-3 xl:px-16 xl:py-4 text-base font-semibold text-white transition-all duration-300 rounded-2xl w-max bg-[rgba(255,255,255,0.3)] backdrop-blur-[20px] border border-white"
      >
        <span class="text-white">
          {{ t('all') }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import TenderCard from '@/common/TenderCard.vue'
import { useGetTenders } from '@/services/useTenders'
import { getContent, getTitle } from '@/utils/getData'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const query = computed(() => ({
  limit: 4,
  page: 1,
}))

const { isLoading, isError, data } = useGetTenders(query)
</script>
