<template>
  <div class="minPhone:h-full xl:h-[316px] bg-main-color">
    <Navbar />
    <h1
      class="minPhone:text-2xl xl:text-5xl text-center minPhone:px-4 xl:px-0 minPhone:w-full xl:w-[50vw] mx-auto my-0 text-white font-semibold leading-snug cursor-default minPhone:pb-4 xl:pb-20"
    >
      {{ t('official_papers') }}
    </h1>
  </div>
  <Loading v-if="isFetching" />
  <Error @retry="refetch" v-else-if="isError" />

  <div v-else class="minPhone:my-[5rem] xl:mt-28 mb-[120px] minPhone:px-4 xl:px-[122px] grid gap-8">
    <NoData
      v-if="data.count == 0"
      :title="t('no_news_title')"
      :description="t('no_news_description')"
    />
    <div
      class="grid minPhone:grid-cols-1 xl:grid-cols-[max-content_max-content] place-content-center minPhone:gap-4 xl:gap-8"
    >
      <div
        class="minPhone:w-full xl:w-[582px] h-[220px] border text-main-color border-main-color rounded-[30px] shadow-one pl-10 pr-6 py-8 grid gap-12 cursor-pointer"
        v-for="item in data.data"
        :key="item.id"
        @click="selectedValue = item"
      >
        <h2 class="font-semibold minPhone:text-2xl xl:text-4xl truncate-2-lines text-main-color">
          {{ getTitle(item, locale) }}
        </h2>
      </div>
    </div>
    <Pagination
      :total-items="data.count || 0"
      :items-per-page="limit"
      :current-page="page"
      @page-change="handleChange($event)"
    />
  </div>
  <ContactSection />

  <div
    v-if="selectedValue"
    class="fixed inset-0 flex items-center justify-center bg-[rgba(19,16,36,0.60)] z-50"
    @click="closeModal"
  >
    <div
      ref="modalRef"
      class="bg-white rounded-[30px] minPhone:p-4 xl:p-16 relative minPhone:w-full xl:w-[858px] minPhone:mx-3 xl:mx-0"
      @click.stop
    >
      <div class="flex justify-end">
        <CloseOutlined class="cursor-pointer text-xl" @click="selectedValue = null" />
      </div>

      <div class="grid gap-14">
        <h2 class="text-2xl font-semibold text-center cursor-default text-text-color">
          {{ getTitle(selectedValue, locale) }}
        </h2>

        <div class="grid gap-2">
          <div
            v-for="(list, index) in selectedValue.lists"
            :key="list.id"
            class="grid grid-cols-[1fr_max-content] place-items-center py-2 hover:bg-[#DEE6FB] px-2 rounded-2xl"
          >
            <h3 class="text-lg font-medium w-full">
              {{ index + 1 }}. {{ getTitle(list, locale) }}
            </h3>

            <div
              class="grid grid-cols-[max-content_max-content] place-items-center gap-2 px-12 py-2 text-base font-medium text-white transition-all duration-300 bg-main-color rounded-2xl w-max hover:bg-buttonHoverColor cursor-pointer"
              @click.stop="downloadFile(list)"
            >
              <DownloadOutlined />
              <p>{{ t('download') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Error from '@/common/Error.vue'
import Loading from '@/common/Loading.vue'
import Navbar from '@/common/Navbar.vue'
import NoData from '@/common/NoData.vue'
import Pagination from '@/common/Pagination.vue'
import ContactSection from '@/components/ContactSection.vue'
import { useGetPapers } from '@/services/usePapers'
import { getTitle } from '@/utils/getData'
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const server = import.meta.env.VITE_API_URL

const { t, locale } = useI18n()

const page = ref(1)
const limit = ref(10)

const router = useRouter()
const route = useRoute()

const selectedValue = ref(null)
const modalRef = ref(null)

const queryKey = computed(() => ({
  page: page.value,
  limit: limit.value,
}))

const { isFetching, isError, data, refetch } = useGetPapers(queryKey)

const handleChange = (newPage) => {
  page.value = newPage

  router.push({
    query: {
      ...route.query,
      page: newPage === 1 ? undefined : newPage,
    },
  })
}

const closeModal = () => {
  selectedValue.value = null
}

const downloadFile = (list) => {
  if (!list?.file?.path) return

  const link = document.createElement('a')

  link.href = `${server}/${list.file.path}`
  link.download = list.file.originalName || list.title

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const reload = () => {
  page.value = Number(route.query.page) || 1
}

watch(() => route.query.page, reload, { immediate: true })
</script>
