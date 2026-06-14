<template>
  <div class="min-h-[320px] xl:h-[379px] bg-indigo-800 relative">
    <Navbar />

    <div class="container mx-auto px-4">
      <h1
        class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-center px-4 w-full lg:w-[70vw] xl:w-[50vw] mx-auto text-white font-semibold leading-snug pb-4 xl:pb-20"
      >
        {{ t('incoming_events') }}
      </h1>

      <div
        class="w-[95%] sm:w-max mx-auto place-content-center gap-3 sm:gap-4 p-4 sm:p-6 xl:p-10 rounded-[24px] xl:rounded-[30px] shadow-one absolute z-10 left-0 right-0 bottom-[-5rem] sm:bottom-[-4rem] xl:bottom-[-3.5rem] backdrop-blur-[10px] shadow-2xl"
        style="
          background: linear-gradient(
            133deg,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.4) 100%
          );
        "
      >
        <!-- Selected Type -->
        <div v-if="selectedKey" class="bg-white rounded-[20px] shadow-lg p-4 mb-4">
          <button class="w-full flex items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <div class="text-indigo-800 flex items-center justify-center text-xl font-semibold">
                <component :is="items.find((r) => r.key === selectedKey)?.icon" />
              </div>

              <span class="text-indigo-700 text-lg font-semibold">
                {{ items.find((r) => r.key === selectedKey)?.label }}
              </span>
            </div>

            <div
              class="text-indigo-800 flex items-center justify-center text-xl cursor-pointer"
              @click="handleChangeType('')"
            >
              <CloseOutlined />
            </div>
          </button>
        </div>

        <!-- Types -->
        <div v-if="!selectedKey" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            v-for="item in items"
            :key="item.key"
            @click="handleChangeType(item.key)"
            class="w-full px-4 sm:px-6 py-3 rounded-2xl border transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            :class="
              selectedKey === item.key
                ? 'bg-indigo-800 border-indigo-800 text-white'
                : 'bg-white text-indigo-800'
            "
          >
            <component :is="item.icon" />

            <span class="font-semibold text-sm sm:text-base xl:text-lg">
              {{ item.label }}
            </span>
          </button>
        </div>

        <!-- Categories -->
        <div v-if="selectedKey" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          <div
            v-if="isFetchingCategores"
            class="col-span-full text-center text-indigo-600 animate-pulse"
          >
            Loading categories...
          </div>

          <div v-else-if="isErrorCategories" class="col-span-full text-center text-red-500">
            Failed to load categories
          </div>

          <button
            v-else
            v-for="item in ct"
            :key="item.key"
            @click="handleChangeCategory(item.key)"
            class="w-full px-4 py-3 rounded-2xl border transition-all duration-300 shadow-lg cursor-pointer"
            :class="
              categoryId == item.key
                ? 'bg-indigo-800 border-indigo-800 text-white'
                : 'bg-white text-indigo-800'
            "
          >
            <span class="font-semibold text-sm sm:text-base">
              {{ item.label }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="my-24 relative">
    <!-- Active Filter -->
    <div class="w-fit ml-auto mb-8 bg-indigo-100 rounded-l-2xl px-5 py-3 shadow-sm">
      <p class="font-semibold text-sm xl:text-base">
        {{ selectedKey ? items.find((r) => r.key === selectedKey)?.label : t('all') }}

        {{
          selectedKey
            ? ` / ${
                categoryId ? ct.find((r) => r.key === categoryId)?.label || t('all') : t('all')
              }`
            : ''
        }}
      </p>
    </div>

    <Loading v-if="isFetching" />

    <Error v-else-if="isError" @retry="refetch" />

    <div v-else class="px-4 sm:px-6 lg:px-8 xl:px-0 xl:mt-[150px] xl:mb-[120px] grid gap-8">
      <NoData
        v-if="data.count === 0"
        :title="t('no_news_title')"
        :description="t('no_news_description')"
      />

      <div
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 max-w-7xl mx-auto"
      >
        <EventPageCard
          v-for="event in data.data"
          :key="event.id"
          :title="getTitle(event, locale)"
          :content="getContent(event, locale)"
          :id="event.id"
          :url="getImage(event)"
        />
      </div>

      <Pagination
        :total-items="data.count || 0"
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
import EventPageCard from '@/common/EventPageCard.vue'
import Loading from '@/common/Loading.vue'
import Navbar from '@/common/Navbar.vue'
import NoData from '@/common/NoData.vue'
import Pagination from '@/common/Pagination.vue'
import ContactSection from '@/components/ContactSection.vue'
import { useGetEvents } from '@/services/useEvents'
import { useGetCategories } from '@/services/useGetCategories'
import { getContent, getTitle } from '@/utils/getData'
import { CloseOutlined, ContainerOutlined, GlobalOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t, locale } = useI18n()
const selectedKey = ref('')
const page = ref(1)
const limit = ref(6)
const ct = ref([])
const categoryId = ref('all')
const router = useRouter()
const route = useRoute()

const items = computed(() => [
  {
    key: 'local',
    label: t('local_news'),
    icon: ContainerOutlined,
  },
  {
    key: 'international',
    label: t('international_news'),
    icon: GlobalOutlined,
  },
])

const queryKey = computed(() => ({
  type: selectedKey.value,
  page: page.value,
  limit: limit.value,
  categoryId: categoryId.value,
}))
const { isFetching, refetch, data, isError } = useGetEvents(queryKey)

const query = computed(() => ({
  type: selectedKey.value,
}))
const {
  isFetching: isFetchingCategores,
  data: categories,
  error: categoriesError,
  isError: isErrorCategories,
} = useGetCategories(query)

const handleChangeType = (key) => {
  page.value = 1
  categoryId.value = key ? 'all' : ''
  selectedKey.value = key
  router.push({
    query: {
      type: selectedKey.value ? selectedKey.value : undefined,
      categoryId: categoryId.value ? categoryId.value : undefined,
      page: undefined,
    },
  })
}

const handleChangeCategory = (key) => {
  const query = route.query
  page.value = 1
  categoryId.value = key

  router.push({
    query: {
      ...query,
      categoryId: key ? key : undefined,
      page: undefined,
    },
  })
}
const handleChange = (newPage) => {
  page.value = newPage

  const query = route.query

  router.push({
    query: {
      ...query,
      page: newPage === 1 ? undefined : newPage,
    },
  })
}
const reload = () => {
  if (route.query.page) {
    page.value = parseInt(route.query.page) || 1
  } else {
    page.value = 1
  }
  if (route.query.categoryId) {
    categoryId.value = route.query.categoryId
  } else {
    categoryId.value = ''
  }
  if (route.query.type) {
    selectedKey.value = route.query.type
  } else {
    selectedKey.value = ''
  }
}

watch(() => route.query, reload)
watch([() => categories.value, () => locale.value], () => {
  if (categories.value) {
    ct.value = [
      {
        label: t('all'),
        key: 'all',
      },
    ]
    categories.value.data?.forEach((el) => {
      let label = ''
      if (locale.value === 'tm') {
        label = el.nameTm
      } else if (locale.value == 'nm') {
        label = el.nameEn
      } else {
        label = el.nameRu
      }
      ct.value.push({
        label,
        key: el.id,
      })
    })
  }
})

const server = import.meta.env.VITE_API_URL

const getImage = (item) => {
  return item?.files?.length
    ? `${server}/${item.files[0].path}`
    : 'https://via.placeholder.com/600x400'
}
onMounted(() => {
  reload()
})
</script>
