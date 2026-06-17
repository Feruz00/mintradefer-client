<template>
  <div class="xl:h-[510px] bg-main-color relative">
    <Navbar />
    <div class="grid pb-28 minPhone:gap-6 xl:gap-14" v-if="isSuccess">
      <h1
        class="minPhone:text-2xl xl:text-5xl text-center minPhone:px-4 xl:px-0 minPhone:w-full xl:w-[70vw] mx-auto my-0 text-white font-semibold leading-snug cursor-default"
      >
        {{ data.data.title }}
      </h1>
      <h1
        class="minPhone:text-2xl xl:text-5xl text-center minPhone:w-full xl:w-[50vw] mx-auto my-0 text-white font-semibold leading-snug cursor-default"
      >
        TENDER № {{ data.data.tenderNumber }}
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
  <div
    v-else
    class="minPhone:my-[2rem] xl:my-[120px] xl:pl-[102px] grid minPhone:grid-cols-1 xl:grid-cols-[max-content_1fr] minPhone:gap-4 xl:gap-[104px] relative"
  >
    <div class="grid minPhone:gap-10 xl:gap-20 minPhone:order-2 xl:order-1 minPhone:px-4 xl:px-0">
      <div class="grid minPhone:gap-4 xl:gap-10">
        <h1
          class="minPhone:text-xl xl:text-4xl font-semibold cursor-default text-text-color minPhone:w-full xl:w-[50vw]"
        >
          {{ getTitle(data.data, locale) }}
        </h1>
        <p
          class="minPhone:text-base xl:text-xl font-regular cursor-default text-text-color minPhone:w-full xl:w-[50vw]"
          v-html="getContent(data.data, locale)"
        ></p>

        <p
          class="minPhone:text-base xl:text-xl font-semibold cursor-default text-text-color minPhone:w-full xl:w-[50vw]"
        >
          Bäsleşigiň möhleti:
          <span class="font-normal minPhone:text-base xl:text-xl"
            >{{ dayjs(data.data.startDate).format('DD.MM.YYYY') }} -
            {{ dayjs(data.data.endDate).format('DD.MM.YYYY') }}</span
          >
        </p>
      </div>
      <div class="grid gap-20">
        <div
          class="grid minPhone:grid-cols-1 xl:grid-cols-[max-content_max-content] minPhone:gap-5 xl:gap-10"
        >
          <div class="grid gap-4">
            <div class="grid grid-cols-[max-content_max-content] gap-2">
              <MailOutlined />
              <p class="text-base font-semibold cursor-default text-main-color">{{ t('email') }}</p>
            </div>
            <div class="grid gap-2">
              <p class="text-base font-medium cursor-default text-text-color">
                {{ data.data.email }}
              </p>
            </div>
          </div>
          <div class="grid gap-4">
            <div class="grid grid-cols-[max-content_max-content] gap-2">
              <PhoneOutlined />
              <p class="text-base font-semibold cursor-default text-main-color">{{ t('phone') }}</p>
            </div>
            <p class="text-base font-medium cursor-default text-text-color">
              {{ data.data.phoneNumber }}
            </p>
          </div>
          <div class="grid gap-4">
            <div class="grid grid-cols-[max-content_max-content] gap-2">
              <HomeOutlined />
              <p class="text-base font-semibold cursor-default text-main-color">
                {{ t('address') }}
              </p>
            </div>
            <p
              class="text-base font-medium cursor-default text-text-color minPhone:w-full xl:w-[15vw]"
            >
              {{ data.data.adress }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="rounded-l-[30px] minPhone:py-[52px] minPhone:px-8 xl:py-[72px] xl:px-14 bg-shade-color w-[343px] h-[90px] place-self-end grid place-content-center top-0 minPhone:relative xl:absolute cursor-default"
    >
      <p class="font-semibold minPhone:text-sm xl:text-base text-text-color">
        {{ getTitle(company.company, locale) }}
      </p>
    </div>
  </div>
  <ContactSection />
</template>

<script setup>
import Error from '@/common/Error.vue'
import Loading from '@/common/Loading.vue'
import Navbar from '@/common/Navbar.vue'
import { useGetTender } from '@/services/useTenders'
import useCompany from '@/stores/counter'
import { getContent, getTitle } from '@/utils/getData'
import { ArrowLeftOutlined, HomeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const server = import.meta.env.VITE_API_URL
const company = useCompany()
const route = useRoute()
const postId = computed(() => route.params.id)
const { t, locale } = useI18n()
const { isFetching, data, isError, error, isSuccess, refetch } = useGetTender(postId)
</script>
