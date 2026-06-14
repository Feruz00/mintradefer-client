<template>
  <div class="minPhone:h-[239px] xl:h-[379px] bg-main-color relative">
    <Navbar />
    <h1
      class="minPhone:text-2xl xl:text-5xl text-center minPhone:px-4 xl:px-0 minPhone:w-full xl:w-[50vw] mx-auto my-0 text-white font-semibold leading-snug cursor-default minPhone:pb-4 xl:pb-20"
    >
      {{ t('tenders') }}
    </h1>
    <div
      class="grid grid-cols-[max-content_max-content] w-max mx-auto my-0 place-content-center gap-4 minPhone:p-6 xl:p-10 rounded-[30px] shadow-one absolute z-10 left-0 right-0 bottom-[-3.5rem] backdrop-blur-[10px]"
      style="
        background: linear-gradient(
          133deg,
          rgba(255, 255, 255, 0.6) 0%,
          rgba(255, 255, 255, 0.4) 100%
        );
      "
    >
      <button
        v-for="item in items"
        :key="item.key"
        @click="handleChangeType(item.key)"
        class="px-4 sm:px-6 xl:px-12 py-3 rounded-2xl border transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        :class="
          selectedKey == item.key ? 'bg-indigo-800 border-indigo-800 text-white' : 'text-indigo-800'
        "
      >
        <div
          class="text-xl font-semibold flex items-center justify-center"
          :class="selectedKey == item.key ? 'text-white' : 'text-indigo-800'"
        >
          <component :is="item.icon" />
        </div>

        <span
          class="font-semibold text-sm sm:text-base xl:text-xl"
          :class="selectedKey == item.key ? 'text-white' : 'text-indigo-800'"
        >
          {{ item.label }}
        </span>
      </button>
    </div>
  </div>
  <Loading v-if="isFetching" />

  <Error @retry="refetch" v-else-if="isError" />

  <div
    v-else
    class="minPhone:my-[5rem] xl:mt-[150px] minPhone:px-4 xl:px-0 xl:mb-[120px] grid gap-8"
  >
    <NoData
      v-if="data.count == 0"
      :title="t('no_news_title')"
      :description="t('no_news_description')"
    />
    <div
      class="grid minPhone:grid-cols-1 xl:grid-cols-[max-content_max-content] minPhone:gap-4 xl:gap-8 place-content-center place-items-center"
    >
      <TenderCard
        v-for="i in data.data"
        :key="i.id"
        :id="i.id"
        :title="getTitle(i, locale)"
        :content="getContent(i, locale)"
        :start-date="i.startDate"
        :end-date="i.endDate"
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
import Error from '@/common/Error.vue'
import Loading from '@/common/Loading.vue'
import Navbar from '@/common/Navbar.vue'
import NoData from '@/common/NoData.vue'
import Pagination from '@/common/Pagination.vue'
import TenderCard from '@/common/TenderCard.vue'
import ContactSection from '@/components/ContactSection.vue'
import { useGetTenders } from '@/services/useTenders'
import { getContent, getTitle } from '@/utils/getData'
import { ContainerOutlined, GlobalOutlined } from '@ant-design/icons-vue'
import { watch } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const selectedKey = ref('local')
const page = ref(1)
const limit = ref(6)

const router = useRouter()
const route = useRoute()

const { t, locale } = useI18n()

const items = computed(() => [
  {
    key: 'local',
    label: t('local_tenders'),
    icon: ContainerOutlined,
  },
  {
    key: 'international',
    label: t('international_tenders'),
    icon: GlobalOutlined,
  },
])

const queryKey = computed(() => ({
  type: selectedKey.value,
  page: page.value,
  limit: limit.value,
}))

const { isFetching, isError, data, refetch } = useGetTenders(queryKey)

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

const handleChangeType = (key) => {
  page.value = 1
  selectedKey.value = key
  router.push({
    query: {
      type: key,
      page: undefined,
    },
  })
}

const reload = () => {
  selectedKey.value = route.query.type || 'local'

  if (route.query.page) {
    page.value = parseInt(route.query.page) || 1
  }
}

watch(() => route.query, reload)

onMounted(() => {
  reload()
})
</script>
