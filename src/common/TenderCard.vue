<template>
  <router-link
    :to="{ name: 'tender-item', params: { id: props.id } }"
    class="bg-white rounded-[30px] p-6 shadow-lg w-full xl:w-[582px] grid gap-4 xl:gap-6 cursor-pointer"
  >
    <h2
      class="pb-2 font-semibold border-b text-lg xl:text-2xl truncate-3-lines text-text-color border-shade-color"
    >
      {{ props.title }}
    </h2>

    <div
      class="font-medium text-base xl:text-lg text-gray-700 truncate-2-lines"
      v-html="props.content"
    ></div>

    <div class="grid grid-cols-[max-content_1fr_max-content] place-items-center gap-2">
      <p class="font-medium text-base xl:text-lg text-indigo-700">
        {{ dayjs(props.startDate).format('DD.MM.YYYY') }}
      </p>

      <div class="h-[1px] w-full bg-indigo-200"></div>

      <p class="text-base xl:text-lg font-medium text-indigo-700 bg-indigo-100 rounded-[4px] p-1">
        {{ dayjs(props.endDate).format('DD.MM.YYYY') }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  title: String,
  content: String,
  startDate: Date,
  endDate: Date,
  id: Number,
})
</script>
