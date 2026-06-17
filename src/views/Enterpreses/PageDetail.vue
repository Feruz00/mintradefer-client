<template>
  <!-- HERO -->
  <div class="relative bg-main-color">
    <Navbar />

    <div class="pb-28" v-if="data?.data">
      <h1
        class="minPhone:text-2xl xl:text-5xl text-center text-white font-semibold w-full xl:w-[60vw] mx-auto px-4"
      >
        {{ getTitle(data.data, locale) }}
      </h1>
    </div>

    <!-- Back -->
    <div
      @click="$router.go(-1)"
      class="absolute left-6 xl:left-16 bottom-8 py-3 px-3 rounded-lg bg-white/30 backdrop-blur-lg border border-white cursor-pointer"
    >
      <ArrowLeftOutlined class="text-white text-lg" />
    </div>
  </div>

  <!-- Loading -->
  <Loading v-if="isLoading" />

  <!-- Error -->
  <Error v-else-if="isError" />

  <!-- Content -->
  <template v-else-if="data?.data">
    <!-- IMAGE -->
    <div class="max-w-7xl mx-auto px-4 xl:px-0 mt-12">
      <div class="overflow-hidden rounded-3xl shadow-xl">
        <img
          :src="getImage(data.data)"
          class="w-full h-[250px] md:h-[450px] xl:h-[600px] object-cover"
        />
      </div>
    </div>

    <!-- INFO -->
    <div
      class="max-w-7xl mx-auto px-4 xl:px-0 my-12 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-10"
    >
      <!-- LEFT -->
      <div>
        <div class="bg-white rounded-3xl shadow-lg p-8">
          <h2 class="text-3xl font-semibold text-indigo-800 mb-8">
            {{ getTitle(data.data, locale) }}
          </h2>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Work Area -->
            <div class="bg-indigo-50 rounded-2xl p-6">
              <h3 class="font-semibold text-indigo-700 mb-2">
                {{ t('area_of_work') }}
              </h3>

              <p class="text-gray-700">
                {{ getWorkArea(data.data, locale) }}
              </p>
            </div>

            <!-- Works -->
            <div class="bg-indigo-50 rounded-2xl p-6">
              <h3 class="font-semibold text-indigo-700 mb-2">
                {{ t('types_of_activity') }}
              </h3>

              <p class="text-gray-700">
                {{ getWorks(data.data, locale) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="space-y-5">
        <!-- Address -->
        <div class="bg-white rounded-3xl shadow-lg p-6">
          <h3 class="font-semibold text-indigo-700 mb-3">
            {{ t('address') }}
          </h3>

          <p class="text-gray-700">
            {{ data.data.address }}
          </p>
        </div>

        <!-- Phone -->
        <div class="bg-white rounded-3xl shadow-lg p-6">
          <h3 class="font-semibold text-indigo-700 mb-3">
            {{ t('phone') }}
          </h3>

          <a :href="`tel:${data.data.phoneNumber}`" class="text-indigo-600 hover:underline">
            {{ data.data.phoneNumber }}
          </a>
        </div>

        <!-- Fax -->
        <div class="bg-white rounded-3xl shadow-lg p-6">
          <h3 class="font-semibold text-indigo-700 mb-3">Fax</h3>

          <p class="text-gray-700">
            {{ data.data.fax }}
          </p>
        </div>
        <div class="bg-white rounded-3xl shadow-lg p-6">
          <h3 class="font-semibold text-indigo-700 mb-3">{{ t('web_url') }}</h3>

          <a-button
            type="link"
            :href="data.data.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-700"
          >
            {{ data.data.url }}
          </a-button>
        </div>
      </div>
    </div>

    <ContactSection />
  </template>
</template>

<script setup>
import Navbar from '@/common/Navbar.vue'
import Loading from '@/common/Loading.vue'
import Error from '@/common/Error.vue'
import ContactSection from '@/components/ContactSection.vue'

import { ArrowLeftOutlined } from '@ant-design/icons-vue'

import { useGetEnterprise } from '@/services/useEnterprises'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { getTitle, getWorkArea, getContent, getWorks } from '@/utils/getData'

const server = import.meta.env.VITE_API_URL

const route = useRoute()

const id = computed(() => route.params.id)

const { locale, t } = useI18n()

const { isLoading, data, error, isError } = useGetEnterprise(id)

const getImage = (item) => {
  return item?.files?.length
    ? `${server}/${item.files[0].path}`
    : 'https://via.placeholder.com/1200x600'
}
</script>
