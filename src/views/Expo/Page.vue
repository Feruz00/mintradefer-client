<template>
  <div class="bg-main-color">
    <Navbar />

    <div class="px-4 sm:px-6 lg:px-8 xl:px-0">
      <h1
        class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-center text-white font-semibold leading-snug max-w-3xl mx-auto pb-6 lg:pb-10"
      >
        Expo-2025

        <p v-if="isSuccess && countdown" class="text-white text-lg sm:text-xl xl:text-2xl mt-2">
          {{ countdown }}
        </p>
      </h1>

      <Loading v-if="isFetching" />
      <Error v-else-if="isError" @retry="refetch" />

      <Swiper
        v-else-if="data?.data?.files?.length"
        :modules="[Autoplay, Pagination, Navigation]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 3000 }"
        :pagination="{ clickable: true }"
        class="w-full max-w-6xl mx-auto px-4 pb-10"
      >
        <SwiperSlide v-for="item in data.data.files" :key="item.id" class="flex justify-center">
          <div
            class="w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] rounded-xl overflow-hidden"
          >
            <img :src="server + '/' + item.path" class="w-full h-full object-cover" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  <div
    class="mt-12 sm:mt-16 lg:mt-20 xl:mt-24 px-4 sm:px-6 lg:px-10 xl:px-[102px] grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-8 lg:gap-12 xl:gap-[104px]"
  >
    <div v-if="isSuccess" class="w-full xl:max-w-[50vw]">
      <p class="text-base sm:text-lg lg:text-xl text-text-color leading-relaxed">
        {{ getContent(data.data, locale) }}
      </p>
    </div>
    <div
      class="w-full max-w-[343px] mx-auto xl:mx-0 px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10 bg-shade-color rounded-l-[30px] flex items-center justify-center"
    >
      <p class="font-semibold text-sm sm:text-base text-text-color text-center">
        {{ getTitle(company.company, locale) }}
      </p>
    </div>
  </div>

  <div class="my-12 sm:my-16 lg:my-24 xl:my-[120px] bg-shade-color">
    <div
      class="py-16 sm:py-20 lg:py-24 xl:py-[159px] px-4 sm:px-6 lg:px-10 xl:px-[122px] flex justify-center"
    >
      <p
        class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center text-text-color max-w-3xl"
      >
        {{ t('expo_2025_news') }}
      </p>
    </div>
  </div>
  <Loading v-if="isFetchingExpo" />

  <Error @retry="refetchExpo" v-else-if="isErrorExpo" />

  <div v-else class="mt-[180px] sm:mt-[170px] xl:mt-[150px] mb-[5rem] xl:mb-[120px] grid gap-8">
    <NoData
      v-if="expo.count == 0"
      :title="t('no_news_title')"
      :description="t('no_news_description')"
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
      <PostCard
        v-for="post in expo.data"
        :key="post.id"
        :id="post.id"
        :title="getTitle(post, locale)"
        :content="getContent(post, locale)"
        :createdAt="post.createdAt"
        :path="getImage(post)"
      />
    </div>

    <div class="mt-10 flex justify-center">
      <MyPagination
        :total-items="expo.count || 0"
        :items-per-page="limit"
        :current-page="page"
        @page-change="handleChange"
      />
    </div>
  </div>
  <ContactSection />
</template>

<script setup>
import Error from '@/common/Error.vue'
import Loading from '@/common/Loading.vue'
import Navbar from '@/common/Navbar.vue'
import { useGetExpo } from '@/services/useExpo'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { ref, computed, onMounted, onUnmounted, watch, onBeforeMount } from 'vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useGetPosts } from '@/services/usePosts'
import { default as MyPagination } from '@/common/Pagination.vue'
import PostCard from '@/common/PostCard.vue'
import NoData from '@/common/NoData.vue'
import ContactSection from '@/components/ContactSection.vue'
import { getContent, getTitle } from '@/utils/getData'
import useCompany from '@/stores/counter'
const server = import.meta.env.VITE_API_URL
const { t, locale } = useI18n()
const company = useCompany()
const page = ref(1)
const limit = ref(6)
const router = useRouter()
const route = useRoute()

const queryKey = computed(() => ({
  type: 'expo',
  page: page.value,
  limit: limit.value,
}))
const {
  isFetching: isFetchingExpo,
  isError: isErrorExpo,
  data: expo,
  refetch: refetchExpo,
} = useGetPosts(queryKey)

const { isLoading, data, error, isError, refetch, isSuccess } = useGetExpo()

const countdown = ref('')

let interval = null

const formatTime = (targetDate) => {
  const now = new Date()
  const end = new Date(targetDate)

  const diff = end - now

  if (diff <= 0) return null

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)

  return `${days} ${t('days')} ${hours} ${t('hours')} ${minutes} ${t('minutes')}`
}

const startCountdown = (date) => {
  if (!date) return

  clearInterval(interval)

  const update = () => {
    const result = formatTime(date)

    if (!result) {
      countdown.value = ''
      clearInterval(interval)
      return
    }

    countdown.value = result
  }

  update()
  interval = setInterval(update, 1000)
}

const handleChange = (newPage) => {
  page.value = newPage

  const query = { ...route.query }

  router.push({
    query: {
      ...query,
      page: newPage === 1 ? undefined : newPage,
    },
  })
}

const getImage = (item) => {
  return item?.files?.length
    ? `${server}/${item.files[0].path}`
    : 'https://via.placeholder.com/600x400'
}

watch(
  () => data?.value?.data?.date,
  (newDate) => {
    if (newDate) startCountdown(newDate)
  },
  { immediate: true },
)
const reload = () => {
  if (route.query.page) {
    page.value = parseInt(route.query.page) || 1
  }
}
watch(() => route.query, reload)
onUnmounted(() => {
  clearInterval(interval)
})
onMounted(() => {
  reload()
  if (data?.value?.data?.date) {
    startCountdown(data.value.data.date)
  }
})
</script>
