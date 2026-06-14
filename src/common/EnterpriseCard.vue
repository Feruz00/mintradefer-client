<template>
  <router-link
    :to="{ name: 'enterprises-item', params: { id: props.id } }"
    class="block w-full max-w-[534px] h-full rounded-[30px] shadow-lg overflow-hidden bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <img
      :src="url"
      alt="enterprise"
      class="w-full h-[220px] sm:h-[260px] lg:h-[300px] xl:h-[355px] object-cover"
    />

    <div class="p-4 sm:p-5 xl:p-6 flex flex-col gap-3 xl:gap-5">
      <h2 class="font-semibold text-lg sm:text-xl text-indigo-800 truncate-3-lines">
        {{ props.title }}
      </h2>

      <div
        class="font-medium text-sm sm:text-base lg:text-lg text-indigo-800 truncate-2-lines"
        v-html="props.content"
      ></div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  url: String,
  content: String,
  title: String,
  id: Number,
})
</script>
