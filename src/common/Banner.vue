<template>
  <div class="relative w-full px-4 sm:px-8 lg:px-20">
    <!-- TOP MENU (hidden on mobile) -->
    <div
      class="hidden lg:grid grid-cols-4 w-fit mx-auto gap-3 sm:gap-4 p-4 sm:p-6 lg:p-10 rounded-[20px] sm:rounded-[30px] bg-[rgba(255,255,255,0.6)] shadow-md absolute z-10 left-0 right-0 top-[-3rem] sm:top-[-4.5rem]"
    >
      <router-link
        v-for="route in otherRoutes"
        :key="route.key"
        :to="route.path"
        class="flex items-center gap-2 sm:gap-3 py-2 group sm:py-4 px-4 sm:px-6 lg:px-8 rounded-xl sm:rounded-2xl border border-white bg-[rgba(255,255,255,0.5)] backdrop-blur-[20px] font-semibold transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600"
      >
        <div
          class="text-indigo-700 flex items-center justify-center group-hover:text-white text-sm sm:text-lg lg:text-xl"
        >
          <component :is="route.icon" />
        </div>

        <span class="text-indigo-700 group-hover:text-white text-sm sm:text-lg lg:text-xl">
          {{ route.name }}
        </span>
      </router-link>
    </div>

    <!-- LOADING -->
    <div v-if="isLoading" class="text-white animate-pulse text-center py-10">
      Loading banners...
    </div>

    <!-- ERROR -->
    <div v-else-if="isError" class="text-red-300 text-center py-10">Failed to load banners</div>

    <!-- SWIPER -->
    <Swiper
      v-else-if="data?.data?.length"
      :modules="[Autoplay, Pagination, Navigation]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      :pagination="{ clickable: true }"
      class="w-full max-w-6xl"
    >
      <SwiperSlide
        v-for="item in data.data"
        :key="item.id"
        class="flex items-center justify-center"
      >
        <div
          class="h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center rounded-xl overflow-hidden"
        >
          <img
            :src="server + '/' + item.path"
            class="max-h-full rounded-xl object-contain shadow-2xl"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGetBanner } from '@/services/useBanner'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import {
  TrophyOutlined,
  FileTextOutlined,
  FileProtectOutlined,
  GlobalOutlined,
} from '@ant-design/icons-vue'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const server = import.meta.env.VITE_API_URL

const { t } = useI18n()
const { isLoading, data, isError } = useGetBanner()

const otherRoutes = computed(() => [
  {
    key: 'expo',
    path: { name: 'expo' },
    name: t('expo'),
    icon: TrophyOutlined,
  },
  {
    key: 'tenders',
    path: { name: 'tender' },
    name: t('tenders'),
    icon: FileTextOutlined,
  },
  {
    key: 'official_papers',
    path: { name: 'official-papers' },
    name: t('official_papers'),
    icon: FileProtectOutlined,
  },
  {
    key: 'online_service',
    path: { name: 'online-service' },
    name: t('online_service'),
    icon: GlobalOutlined,
  },
])
</script>
