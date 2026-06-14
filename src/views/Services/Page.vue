<template>
  <div class="minPhone:h-full xl:h-[316px] bg-main-color">
    <Navbar />
    <h1
      class="minPhone:text-2xl xl:text-5xl text-center minPhone:px-4 xl:px-0 minPhone:w-full xl:w-[50vw] mx-auto my-0 text-white font-semibold leading-snug cursor-default minPhone:pb-4 xl:pb-20"
    >
      {{ t('online_service') }}
    </h1>
  </div>
  <div
    class="minPhone:my-[5rem] xl:mt-28 xl:mb-[120px] minPhone:px-4 xl:px-[122px] minPhone:grid minPhone:grid-cols-1 xl:flex place-content-center xl:gap-8"
  >
    <div class="minPhone:flex minPhone:flex-col minPhone:gap-4 xl:flex-none xl:gap-0">
      <div
        class="minPhone:w-full xl:w-[582px] border border-main-color rounded-[30px] shadow-one pl-10 pr-6 py-8 grid gap-12 cursor-pointer xl:mb-12"
      >
        <h2 class="text-4xl font-semibold truncate-2-lines text-main-color">
          Mysal Sanly Hyzmat №1
        </h2>
        <Image />
      </div>
      <div
        class="minPhone:w-full xl:w-[582px] border border-main-color rounded-[30px] shadow-one pl-10 pr-6 py-8 grid gap-12 cursor-pointer xl:mb-12"
      >
        <h2 class="text-4xl font-semibold truncate-2-lines text-main-color">
          Mysal Sanly Hyzmat №3
        </h2>
        <Image />
      </div>
      <div
        class="minPhone:w-full xl:w-[582px] border border-main-color rounded-[30px] shadow-one pl-10 pr-6 py-8 grid gap-12 cursor-pointer xl:mb-12"
      >
        <h2 class="text-4xl font-semibold truncate-2-lines text-main-color">
          Mysal Sanly Hyzmat №5
        </h2>
        <Image />
      </div>
    </div>
    <div class="minPhone:flex minPhone:flex-col minPhone:gap-4 xl:flex-none xl:gap-0">
      <div
        class="minPhone:w-full xl:w-[582px] border border-main-color rounded-[30px] shadow-one pl-10 pr-6 py-8 grid gap-12 cursor-pointer xl:mt-12"
      >
        <h2 class="text-4xl font-semibold truncate-2-lines text-main-color">
          Mysal Sanly Hyzmat №2
        </h2>
        <Image />
      </div>
      <div
        class="minPhone:w-full xl:w-[582px] border border-main-color rounded-[30px] shadow-one pl-10 pr-6 py-8 grid gap-12 cursor-pointer xl:mt-12"
      >
        <h2 class="text-4xl font-semibold truncate-2-lines text-main-color">
          Mysal Sanly Hyzmat №4
        </h2>
        <Image />
      </div>
      <div
        class="minPhone:w-full xl:w-[582px] border border-main-color rounded-[30px] shadow-one pl-10 pr-6 py-8 grid gap-12 cursor-pointer xl:mt-12"
      >
        <h2 class="text-4xl font-semibold truncate-2-lines text-main-color">
          Mysal Sanly Hyzmat №6
        </h2>
        <Image />
      </div>
    </div>
  </div>
  <ContactSection />
</template>

<script setup>
import Navbar from '@/common/Navbar.vue'
import { useI18n } from 'vue-i18n'
import Image from './Image.vue'
import ContactSection from '@/components/ContactSection.vue'

const { t } = useI18n()
</script>
