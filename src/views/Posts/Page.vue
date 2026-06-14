<template>
  <div class="min-h-[320px] xl:h-[379px] bg-indigo-800 relative">
    <Navbar />

    <h1
      class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-center px-4 w-full lg:w-[70vw] xl:w-[50vw] mx-auto text-white font-semibold leading-snug pb-4 xl:pb-20"
    >
      {{ t('news') }}
    </h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[95%] sm:w-max mx-auto place-content-center gap-3 sm:gap-4 p-4 sm:p-6 xl:p-10 rounded-[24px] xl:rounded-[30px] shadow-one absolute z-10 left-0 right-0 bottom-[-5rem] sm:bottom-[-4rem] xl:bottom-[-3.5rem] backdrop-blur-[10px] shadow-2xl"
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

  <div v-else class="mt-[180px] sm:mt-[170px] xl:mt-[150px] mb-[5rem] xl:mb-[120px] grid gap-8">
    <NoData
      v-if="data.count == 0"
      :title="t('no_news_title')"
      :description="t('no_news_description')"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-fit mx-auto">
      <PostCard
        v-for="post in data.data"
        :key="post.id"
        :id="post.id"
        :title="getTitle(post, locale)"
        :content="getContent(post, locale)"
        :createdAt="post.createdAt"
        :path="getImage(post)"
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
import PostCard from '@/common/PostCard.vue'
import ContactSection from '@/components/ContactSection.vue'
import { useGetPosts } from '@/services/usePosts'
import { getContent, getTitle } from '@/utils/getData'
import { ContainerOutlined, GlobalOutlined, TrophyOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t, locale } = useI18n()

const selectedKey = ref('local')
const page = ref(1)
const limit = ref(6)

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
  {
    key: 'expo',
    label: 'Expo-2025',
    icon: TrophyOutlined,
  },
])

const queryKey = computed(() => ({
  type: selectedKey.value,
  page: page.value,
  limit: limit.value,
}))

const { isFetching, isError, data, refetch } = useGetPosts(queryKey)

const server = import.meta.env.VITE_API_URL

const getImage = (item) => {
  return item?.files?.length
    ? `${server}/${item.files[0].path}`
    : 'https://via.placeholder.com/600x400'
}

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
