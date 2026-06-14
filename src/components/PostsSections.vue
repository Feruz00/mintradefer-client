<template>
  <div
    class="min-h-full xl:h-[524px] bg-indigo-800 px-4 sm:px-6 lg:px-16 xl:px-[122px] py-12 sm:py-14 lg:py-16 grid gap-10 sm:gap-12 place-items-center"
  >
    <!-- Title -->
    <h1
      class="font-semibold text-center text-white cursor-default text-2xl sm:text-3xl xl:text-4xl"
    >
      {{ t('last_news') }}
    </h1>

    <!-- States -->
    <div v-if="isLoading" class="text-indigo-200 animate-pulse text-sm sm:text-base">
      Loading posts...
    </div>

    <div v-else-if="isError" class="text-red-400 text-sm sm:text-base">Failed to load posts</div>

    <!-- Grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl"
    >
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

    <!-- Button -->
    <router-link
      :to="{ name: 'news' }"
      class="inline-flex items-center justify-center px-10 py-3 sm:px-12 sm:py-4 lg:px-16 bg-white/10 backdrop-blur-md border border-white/30 text-base font-semibold text-white transition-all duration-300 xl:bg-indigo-800 shadow-two rounded-2xl w-max hover:bg-indigo-700"
    >
      <span class="text-white">
        {{ t('all') }}
      </span>
    </router-link>
  </div>
</template>
<script setup>
import PostCard from '@/common/PostCard.vue'
import { useGetPosts } from '@/services/usePosts'
import { getContent, getTitle } from '@/utils/getData'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const query = computed(() => ({
  limit: 3,
  page: 1,
}))
const { isLoading, isError, data, error } = useGetPosts(query)
const server = import.meta.env.VITE_API_URL

const getImage = (item) => {
  return item?.files?.length
    ? server + '/' + item.files[0].path
    : 'https://via.placeholder.com/600x400'
}
</script>
