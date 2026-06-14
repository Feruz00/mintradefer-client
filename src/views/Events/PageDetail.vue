<template>
  <div class="relative bg-main-color">
    <Navbar />
    <div class="pb-28" v-if="isSuccess">
      <h1
        class="minPhone:text-xl xl:text-5xl text-center minPhone:w-full xl:w-[60vw] minPhone:px-4 xl:px-0 mx-auto my-0 text-white font-semibold leading-snug cursor-default"
      >
        {{ getTitle(data.data, locale) }}
      </h1>
    </div>
    <div
      @click="$router.go(-1)"
      class="minPhone:py-2 minPhone:px-2 xl:py-3 xl:px-3 place-self-end rounded-lg bg-gradient-to-br from-[rgba(255,255,255,0.6)] to-[rgba(255,255,255,0.4)] backdrop-blur-[20px] cursor-pointer h-fit w-max border border-white absolute minPhone:left-6 xl:left-16 bottom-8"
    >
      <ArrowLeftOutlined class="text-lg" />
    </div>
  </div>
  <Loading v-if="isFetching" />

  <Error v-else-if="isError" @retry="refetch" />
  <Swiper
    v-if="isSuccess && data?.data?.files?.length"
    :modules="[Autoplay, Pagination, Navigation]"
    :slides-per-view="1"
    :loop="true"
    :autoplay="{ delay: 3000 }"
    :pagination="{ clickable: true }"
    class="w-full max-w-6xl"
  >
    <SwiperSlide
      v-for="item in data.data.files"
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
  <div
    v-if="isSuccess"
    class="minPhone:my-[2rem] xl:my-[120px] xl:pl-[102px] grid minPhone:grid-cols-1 xl:grid-cols-[max-content_1fr] minPhone:gap-4 xl:gap-[104px] relative"
  >
    <div
      class="minPhone:text-base xl:text-xl font-regular cursor-default text-text-color minPhone:w-full xl:w-[50vw] minPhone:px-4 minPhone:order-2 xl:order-1"
      v-html="getContent(data.data, locale)"
    ></div>
    <div
      class="rounded-l-[30px] minPhone:py-[52px] minPhone:px-8 xl:py-[72px] xl:px-14 bg-shade-color w-[343px] h-[90px] place-self-end grid place-content-center top-0 minPhone:relative xl:absolute cursor-default"
    >
      <p class="font-semibold minPhone:text-sm xl:text-base text-text-color">
        {{ t('company') }}
      </p>
    </div>
  </div>
  <ContactSection />
</template>

<script setup>
import Error from '@/common/Error.vue'
import Loading from '@/common/Loading.vue'
import Navbar from '@/common/Navbar.vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { useI18n } from 'vue-i18n'
import ContactSection from '@/components/ContactSection.vue'
import { useGetEvent } from '@/services/useEvents'
import { getContent, getTitle } from '@/utils/getData'

const server = import.meta.env.VITE_API_URL

const route = useRoute()
const eventId = computed(() => route.params.id)
const { t, locale } = useI18n()
const { isFetching, data, isError, error, isSuccess, refetch } = useGetEvent(eventId)
</script>
