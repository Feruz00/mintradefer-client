<template>
  <router-link
    :to="{ name: 'news-item', params: { id: props.id } }"
    class="w-full sm:w-[320px] lg:w-[360px] xl:w-[377px] h-full shadow-one rounded-[30px] cursor-pointer overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1 shadow-lg"
  >
    <!-- Image -->
    <img
      :src="props.path"
      alt="news"
      class="w-full h-44 sm:h-48 lg:h-52 xl:h-[17rem] object-cover"
    />

    <!-- Content -->
    <div class="grid gap-4 sm:gap-5 px-4 sm:px-5 lg:px-6 xl:px-8 py-4 sm:py-5 xl:py-6">
      <div class="grid gap-3 sm:gap-4">
        <h2
          class="font-semibold text-textColor text-base sm:text-lg lg:text-xl xl:text-2xl line-clamp-2"
        >
          {{ props.title }}
        </h2>

        <div
          class="text-sm sm:text-base lg:text-lg font-medium text-textColor line-clamp-2"
          v-html="props.content"
        ></div>
      </div>

      <p class="text-xs sm:text-sm lg:text-base font-medium text-placeholderTextColor">
        {{ dayjs(props.createdAt).format('DD.MM.YYYY') }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  title: String,
  content: String,
  createdAt: Date,
  path: String,
  id: Number,
})
</script>
