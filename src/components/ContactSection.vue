<template>
  <div>
    <div v-if="isLoading" class="text-indigo-600 animate-pulse">
      Loading contact informations...
    </div>

    <div v-else-if="isError" class="text-red-500">Failed to load contact informations</div>

    <div
      v-else
      class="grid grid-cols-1 xl:grid-cols-[max-content_max-content] bg-indigo-800 py-10 px-4 xl:pl-[122px] xl:pr-14 place-content-between gap-10 xl:gap-0"
    >
      <div class="grid gap-8 xl:gap-16">
        <h2 class="font-medium text-white text-base xl:text-lg truncate-3-lines">
          {{ t('company') }}
        </h2>

        <div class="grid gap-8">
          <h2 class="font-medium text-white text-base xl:text-lg truncate-3-lines">
            {{ t('contact_for') }}
          </h2>

          <div class="grid gap-4">
            <div class="grid grid-cols-[max-content_1fr] gap-2 items-center">
              <div
                class="font-medium text-white cursor-default text-sm xl:text-base flex items-center justify-center"
              >
                <PhoneOutlined />
              </div>

              <p class="font-medium text-white cursor-default text-sm xl:text-base break-words">
                {{ data.data.phoneNumber }}
              </p>
            </div>

            <div class="grid grid-cols-[max-content_1fr] gap-2 items-center">
              <div
                class="font-medium text-white cursor-default text-sm xl:text-base flex items-center justify-center"
              >
                <HomeOutlined />
              </div>

              <p class="font-medium text-white cursor-default text-sm xl:text-base break-words">
                {{ data.data.address }}
              </p>
            </div>

            <div class="grid grid-cols-[max-content_1fr] gap-2 items-center">
              <div
                class="font-medium text-white cursor-default text-sm xl:text-base flex items-center justify-center"
              >
                <MailOutlined />
              </div>

              <p class="font-medium text-white cursor-default text-sm xl:text-base break-words">
                {{ data.data.email }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="py-2 px-2 xl:py-3 xl:px-3 place-self-start xl:place-self-end rounded-lg bg-gradient-to-br from-[rgba(255,255,255,0.6)] to-[rgba(255,255,255,0.4)] backdrop-blur-[20px] cursor-pointer h-fit border border-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
        @click="scrollToTop"
      >
        <div class="text-white text-lg">
          <ArrowUpOutlined />
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-[max-content_max-content] px-4 gap-2 py-8 bg-indigo-900 place-content-center place-items-center"
    >
      <div
        class="font-medium text-white cursor-default text-[10px] xl:text-sm flex items-center justify-center"
      >
        <CopyrightOutlined />
      </div>

      <p class="font-medium text-white cursor-default text-[10px] xl:text-sm">
        {{ t('company') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useGetContact } from '@/services/useContact'
import {
  ArrowUpOutlined,
  CopyrightOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { isLoading, data, error, isError } = useGetContact()

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>
