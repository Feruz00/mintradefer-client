<template>
  <div class="bg-indigo-100 h-[80vh] my-40">
    <div class="py-16 px-4 sm:px-8 lg:px-20 grid gap-10 place-items-center">
      <!-- TITLE -->
      <h1 class="font-semibold text-center text-2xl sm:text-3xl xl:text-4xl cursor-default">
        {{ t('incoming_events') }}
      </h1>

      <!-- LOADING -->
      <div v-if="isLoading" class="text-indigo-600 animate-pulse">Loading events...</div>

      <!-- ERROR -->
      <div v-else-if="isError" class="text-red-500">Failed to load events</div>

      <!-- CONTENT -->
      <div v-else class="w-full flex items-center justify-center">
        <!-- ===================== -->
        <!-- DESKTOP VERSION (xl+) -->
        <!-- ===================== -->
        <div class="hidden xl:grid grid-cols-[582px_1fr] gap-8">
          <!-- BIG FIRST CARD -->
          <router-link
            v-if="events.length"
            class="relative h-[505px] group cursor-pointer block"
            :to="{ name: 'events-item', params: { id: events[0].id } }"
          >
            <p
              class="absolute left-3 top-3 px-4 py-1 rounded-full bg-white text-gray-800 font-medium group-hover:bg-indigo-600 group-hover:text-white"
            >
              1
            </p>

            <img :src="getImage(events[0])" class="w-full h-full object-cover rounded-[30px]" />

            <div
              class="absolute bottom-0 left-0 right-0 p-6 bg-[rgba(255,255,255,0.6)] backdrop-blur-[20px] rounded-b-[30px]"
            >
              <h2 class="font-semibold text-2xl text-gray-700 line-clamp-2">
                {{ getTitle(events[0], locale) }}
              </h2>

              <div class="text-gray-600 mt-2 line-clamp-2" v-html="getContent(events[0], locale)" />
            </div>
          </router-link>

          <!-- RIGHT LIST -->
          <div class="grid gap-6">
            <router-link
              v-for="(item, i) in events.slice(1)"
              :key="item.id"
              :to="{ name: 'events-item', params: { id: item.id } }"
              class="flex items-center gap-6 bg-white hover:bg-indigo-600 transition-all duration-300 rounded-[30px] py-6 px-6 cursor-pointer group"
            >
              <p
                class="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white font-medium group-hover:bg-white group-hover:text-indigo-600"
              >
                {{ i + 2 }}
              </p>

              <h2 class="font-semibold text-xl text-indigo-600 group-hover:text-white line-clamp-2">
                {{ getTitle(item, locale) }}
              </h2>
            </router-link>
          </div>
        </div>

        <!-- ===================== -->
        <!-- MOBILE + TABLET -->
        <!-- ===================== -->
        <div class="xl:hidden grid gap-6">
          <router-link
            v-for="(item, i) in events"
            :key="item.id"
            :to="{ name: 'events-item', params: { id: item.id } }"
            class="bg-white rounded-2xl overflow-hidden shadow-md"
          >
            <!-- <img :src="getImage(item)" class="w-full h-[200px] object-cover" /> -->

            <div class="p-4 flex gap-4 items-start">
              <p
                class="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-medium"
              >
                {{ i + 1 }}
              </p>

              <div>
                <h2 class="font-semibold text-indigo-800 line-clamp-2">
                  {{ getTitle(item, locale) }}
                </h2>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <router-link
        :to="{ name: 'events' }"
        class="inline-flex items-center justify-center text-base font-semibold bg-indigo-600 shadow-two rounded-2xl transition-all duration-300 px-6 py-3 sm:px-10 sm:py-3 xl:px-16 xl:py-4 hover:bg-indigo-700"
      >
        <span class="text-white">
          {{ t('all') }}
        </span>
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { useGetEvents } from '@/services/useEvents'
import { getContent, getTitle } from '@/utils/getData'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const query = computed(() => ({
  limit: 5,
  page: 1,
}))

const { isLoading, data, isError } = useGetEvents(query)

const events = ref([])

const server = import.meta.env.VITE_API_URL

const getImage = (item) => {
  return item?.files?.length
    ? server + '/' + item.files[0].path
    : 'https://via.placeholder.com/600x400'
}

watch(data, () => {
  if (data.value?.data) {
    events.value = data.value.data
  }
})
onMounted(() => {
  if (data.value?.data) {
    events.value = data.value.data
  }
})
</script>
