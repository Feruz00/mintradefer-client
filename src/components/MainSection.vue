<template>
  <div class="h-[95vh] bg-indigo-800 w-full relative">
    <Navbar />
    <h1
      class="text-center w-full mx-auto text-white font-semibold leading-snug cursor-default text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4 md:px-0 max-w-5xl py-12 lg:pb-40"
    >
      {{ getTitle(company.company, locale) }}
    </h1>
    <Banner />
  </div>
</template>
<script setup>
import Navbar from '@/common/Navbar.vue'
import { useI18n } from 'vue-i18n'
import Banner from '../common/Banner.vue'
import { getTitle } from '@/utils/getData'
import useCompany from '@/stores/counter'
const company = useCompany()
const { t, locale } = useI18n()
</script>
