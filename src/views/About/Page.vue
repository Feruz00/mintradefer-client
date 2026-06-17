<template>
  <div class="min-h-[220px] xl:h-[397px] bg-indigo-800 relative">
    <Navbar />

    <h1
      class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-center px-4 w-full xl:w-[50vw] mx-auto text-white font-semibold leading-snug pb-6 xl:pb-20"
    >
      {{ t('about') }}
    </h1>

    <Loading v-if="isLoading" />
    <Error v-else-if="isError" @retry="refetch" />

    <Swiper
      v-else-if="data?.data?.length"
      :modules="[Autoplay, Pagination, Navigation]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      :pagination="{ clickable: true }"
      class="w-full max-w-6xl mx-auto px-4"
    >
      <SwiperSlide v-for="item in data.data" :key="item.id">
        <div
          class="h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] flex items-center justify-center rounded-xl overflow-hidden"
        >
          <img
            :src="server + '/' + item.path"
            class="w-full h-full object-cover rounded-xl shadow-2xl"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>

  <div
    class="minPhone:mt-[15rem] xl:mt-[45rem] minPhone:px-4 xl:pl-[102px] grid minPhone:grid-cols-1 xl:grid-cols-[max-content_1fr] minPhone:gap-12 xl:gap-[104px]"
  >
    <p
      class="text-base lg:text-lg xl:text-xl font-medium text-gray-800 cursor-default w-full xl:max-w-[50vw] leading-relaxed"
    >
      Türkmenistanyň Söwda we daşary ykdysady aragatnaşyklar ministrligi döwlet dolandyryş edarasy
      bolup, ministrlik öz esasy wezipelerine laýyklykda, Türkmenistanyň içerki bazarynda haryt
      bolçulygyny üpjün etmek, ilata edilýän söwda we jemgyýetçilik iýmiti hyzmatlarynyň guralyşyny
      kämilleşdirmek, halk hojalygyny maddy-tehniki serişdeler bilen üpjün etmek, halkara
      ylalaşyklara laýyklykda, daşary ýurt bazarlarynda Türkmenistanyň döwlet bähbitleriniň berjaý
      edilmegini üpjün etmek boýunça iş alyp barýar.
    </p>

    <div
      class="rounded-l-[30px] minPhone:py-[52px] minPhone:px-8 xl:py-[72px] xl:px-14 bg-shade-color w-[343px] h-[90px] place-self-end grid place-content-center undefined cursor-default"
    >
      <p class="font-semibold text-sm lg:text-base text-indigo-800 text-center">
        {{ getTitle(company.company, locale) }}
      </p>
    </div>
  </div>

  <div class="my-16 lg:my-24 xl:my-[120px] bg-indigo-200">
    <div
      class="py-16 sm:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 lg:px-10 xl:px-[122px] grid place-items-center"
    >
      <p
        class="w-full max-w-5xl text-center text-gray-800 font-semibold leading-relaxed text-base sm:text-lg lg:text-xl xl:text-2xl"
      >
        Türkmenistanyň Söwda we daşary ykdysady aragatnaşyklar ministrligi öz düzüminde söwda,
        önümçilik, üpjünçilik, hyzmat ediş kärhanalarynyň 200-den gowragyny jemleýär. Bu kärhanalar
        esasan şu işleri ýerine ýetirýärler:
      </p>
    </div>
  </div>

  <div
    class="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8 lg:gap-12 xl:gap-14 items-center px-4 sm:px-6 lg:px-10 xl:pr-[102px]"
  >
    <img
      :src="image1"
      alt="img2"
      class="w-full max-w-[424px] h-[320px] sm:h-[420px] xl:h-[560px] object-cover rounded-r-[30px] mx-auto xl:mx-0"
    />

    <div>
      <ul class="space-y-6 lg:space-y-8">
        <li
          class="flex items-start gap-4 lg:gap-6 text-gray-800 font-medium text-base lg:text-lg xl:text-xl"
        >
          <span class="text-3xl lg:text-4xl text-indigo-800 leading-none">•</span>
          <span>
            Öz düzümindäki bazarlarda, söwda merkezlerinde, dükanlarda halkyň sarp edýän
            harytlarynyň bölek söwdasyny guramak;
          </span>
        </li>

        <li
          class="flex items-start gap-4 lg:gap-6 text-gray-800 font-medium text-base lg:text-lg xl:text-xl"
        >
          <span class="text-3xl lg:text-4xl text-indigo-800 leading-none">•</span>
          <span>
            Ýurdumyzyň halk hojalygyny, şeýle hem giň gerimde alnyp barylýan gurluşyklary zerur
            bolan serişdeler, gurluşyk materiallary, enjamlar we tehnika bilen üpjün etmek;
          </span>
        </li>

        <li
          class="flex items-start gap-4 lg:gap-6 text-gray-800 font-medium text-base lg:text-lg xl:text-xl"
        >
          <span class="text-3xl lg:text-4xl text-indigo-800 leading-none">•</span>
          <span> Öz garamagyndaky jemgyýetçilik iýmiti kärhanalarynda ilata hyzmat etmek; </span>
        </li>

        <li
          class="flex items-start gap-4 lg:gap-6 text-gray-800 font-medium text-base lg:text-lg xl:text-xl"
        >
          <span class="text-3xl lg:text-4xl text-indigo-800 leading-none">•</span>
          <span> Halkyň sarp edýän harytlaryny öndürmek we ýerlemek; </span>
        </li>
      </ul>
    </div>
  </div>

  <div
    class="my-16 lg:my-24 xl:my-[120px] py-16 bg-indigo-200 grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8 lg:gap-12 xl:gap-14 items-center px-4 sm:px-6 lg:px-10 xl:pl-[102px]"
  >
    <div class="order-2 xl:order-1">
      <ul class="space-y-6 lg:space-y-8">
        <li
          class="flex items-start gap-4 lg:gap-6 text-gray-800 font-medium text-base lg:text-lg xl:text-xl"
        >
          <span class="text-3xl lg:text-4xl text-indigo-800 leading-none">•</span>
          <span>
            Içerki bazaryn isleglerini doly üpjün etmek üçin Türkmenistanda öndürilmeýan harytlary
            daşary ýurtlardan satyn alyp getirmek;
          </span>
        </li>

        <li
          class="flex items-start gap-4 lg:gap-6 text-gray-800 font-medium text-base lg:text-lg xl:text-xl"
        >
          <span class="text-3xl lg:text-4xl text-indigo-800 leading-none">•</span>
          <span>
            Türkmenistanda öndürilen, daşarky bazarlara niýetlenen harytlary daşary ýurtlara
            ýerlemek;
          </span>
        </li>

        <li
          class="flex items-start gap-4 lg:gap-6 text-gray-800 font-medium text-base lg:text-lg xl:text-xl"
        >
          <span class="text-3xl lg:text-4xl text-indigo-800 leading-none">•</span>
          <span>
            Söwda, önümçilik, şeýle hem medeni-durmuş maksatly binalary we desgalary gurmak;
          </span>
        </li>

        <li
          class="flex items-start gap-4 lg:gap-6 text-gray-800 font-medium text-base lg:text-lg xl:text-xl"
        >
          <span class="text-3xl lg:text-4xl text-indigo-800 leading-none">•</span>
          <span>
            Eýeçiliginiň we guramaçylyk-hukuk gurluşynyň görnüşine garamazdan, kärhanalar hem-de
            hususy telekeçiler tarapyndan Türkmenistanyň çäklerinde söwda düzgünleriniň we
            kadalarynyň berjaý edilişine gözegçilik etmek.
          </span>
        </li>
      </ul>
    </div>

    <img
      :src="image2"
      alt="img3"
      class="order-1 xl:order-2 w-full max-w-[424px] h-[320px] sm:h-[420px] xl:h-[560px] object-cover rounded-l-[30px] mx-auto xl:mx-0 xl:justify-self-end"
    />
  </div>

  <ContactSection />
</template>

<script setup>
import { useGetBanner } from '@/services/useBanner'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Navbar from '@/common/Navbar.vue'
import Loading from '@/common/Loading.vue'
import Error from '@/common/Error.vue'
import image1 from '@/assets/about_1.jpg'
import image2 from '@/assets/about_2.jpg'
import ContactSection from '@/components/ContactSection.vue'
import { getTitle } from '@/utils/getData'
import useCompany from '@/stores/counter'

const server = import.meta.env.VITE_API_URL
const company = useCompany()

const { t, locale } = useI18n()
const { isLoading, data, isError, refetch } = useGetBanner()
const getImage = (item) => {
  return item?.files?.length
    ? `${server}/${item.files[0].path}`
    : 'https://via.placeholder.com/600x400'
}
</script>
