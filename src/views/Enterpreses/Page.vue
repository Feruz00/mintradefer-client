<template>
  <div class="min-h-[320px] sm:min-h-[380px] xl:h-[379px] bg-indigo-800 relative">
    <Navbar />

    <h1
      class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-center px-4 w-full lg:w-[70vw] xl:w-[50vw] mx-auto text-white font-semibold leading-snug pb-6 xl:pb-20"
    >
      Kärhanalar
    </h1>

    <div
      class="absolute z-10 left-1/2 -translate-x-1/2 bottom-[-5rem] sm:bottom-[-4rem] w-[95%] sm:w-[90%] xl:w-max p-4 sm:p-6 xl:p-10 rounded-3xl shadow-one backdrop-blur-[10px]"
      style="
        background: linear-gradient(
          133deg,
          rgba(255, 255, 255, 0.6) 0%,
          rgba(255, 255, 255, 0.4) 100%
        );
      "
    >
      <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
        <button
          v-for="city in cities"
          :key="city.key"
          @click="handleChangeType(city.key)"
          class="px-4 sm:px-6 xl:px-10 py-2.5 sm:py-3 rounded-2xl transition-all duration-300 shadow-lg cursor-pointer"
          :class="
            selectedKey === city.key
              ? 'bg-indigo-800 border border-indigo-800'
              : 'bg-white/70 border border-white'
          "
        >
          <span
            class="text-sm sm:text-base lg:text-lg font-semibold"
            :class="selectedKey === city.key ? 'text-white' : 'text-indigo-800'"
          >
            {{ city.name }}
          </span>
        </button>
      </div>
    </div>
  </div>
  <Loading v-if="isFetching" />
  <Error @retry="refetch" v-else-if="isError" />
  <div v-else class="my-20 px-4 sm:px-6 lg:px-8 xl:px-0 xl:mt-[150px] xl:mb-[120px] grid gap-8">
    <NoData
      v-if="data.count == 0"
      :title="t('no_news_title')"
      :description="t('no_news_description')"
    />
    <div
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 max-w-7xl mx-auto"
    >
      <EnterpriseCard
        v-for="card in data.data"
        :key="card.id"
        :id="card.id"
        :url="getImage(card)"
        :title="getTitle(card, locale)"
        :content="`${t('area_of_work')} ${getWorkArea(card, locale)}`"
      />
    </div>
    <Pagination
      :total-items="data.count || 0"
      :items-per-page="limit"
      :current-page="page"
      @page-change="handleChange($event)"
    />
  </div>
  <ContactSection />
</template>

<script setup>
import EnterpriseCard from '@/common/EnterpriseCard.vue'
import Error from '@/common/Error.vue'
import Loading from '@/common/Loading.vue'
import Navbar from '@/common/Navbar.vue'
import NoData from '@/common/NoData.vue'
import Pagination from '@/common/Pagination.vue'
import ContactSection from '@/components/ContactSection.vue'
import { useGetEnterprises } from '@/services/useEnterprises'
import { getContent, getTitle, getWorkArea } from '@/utils/getData'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()

const selectedKey = ref('')
const page = ref(1)
const limit = ref(6)
const router = useRouter()
const route = useRoute()

const cities = computed(() => [
  {
    name: t('ashgabat'),
    key: 'asgabat',
  },
  {
    name: t('ahal_region'),
    key: 'ahal',
  },
  {
    name: t('balkan_region'),
    key: 'balkan',
  },
  {
    name: t('mary_region'),
    key: 'mary',
  },
  {
    name: t('lebap_region'),
    key: 'lebap',
  },
  {
    name: t('dashoguz_region'),
    key: 'dashoguz',
  },
])

const queryKey = computed(() => ({
  type: selectedKey.value,
  page: page.value,
  limit: limit.value,
}))

const { isFetching, isError, data, refetch } = useGetEnterprises(queryKey)
const server = import.meta.env.VITE_API_URL

const getImage = (item) => {
  return item?.files?.length
    ? `${server}/${item.files[0].path}`
    : 'https://via.placeholder.com/600x400'
}

const handleChange = (newPage) => {
  page.value = newPage

  query = route.query

  if (newPage === 1) {
    router.push({
      query: {
        ...query,
        page: undefined,
      },
    })
  } else {
    router.push({
      query: {
        ...query,
        page: newPage,
      },
    })
  }
}
const handleChangeType = (key) => {
  page.value = 1
  selectedKey.value = key
  query = route.query
  router.push({
    query: {
      type: query.type === key ? undefined : key,
      page: undefined,
    },
  })
}

const reload = () => {
  selectedKey.value = route.query.type || ''

  if (route.query.page) {
    page.value = parseInt(route.query.page) || 1
  }
}

watch(() => route.query, reload)

onMounted(() => {
  reload()
})
</script>
