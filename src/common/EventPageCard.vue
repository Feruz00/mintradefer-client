<template>
  <router-link
    :to="{ name: 'events-item', params: { id: props.id } }"
    class="relative w-full max-w-[582px] group cursor-pointer"
  >
    <img
      class="w-full h-[250px] sm:h-[320px] xl:h-[505px] object-cover rounded-[20px] xl:rounded-[30px]"
      :src="props.url"
      alt="Event"
    />

    <div
      class="absolute bottom-0 left-0 right-0 p-4 sm:p-5 xl:p-6 rounded-b-[20px] xl:rounded-b-[30px] bg-white/60 backdrop-blur-[20px] grid gap-2 xl:gap-4"
    >
      <h2 class="font-semibold text-lg sm:text-xl xl:text-2xl text-textColor truncate-2-lines">
        {{ props.title }}
      </h2>

      <div
        class="font-medium text-sm sm:text-base xl:text-lg text-textColor truncate-2-lines"
        v-html="props.content"
      ></div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  title: String,
  id: Number,
  content: String,
  url: String,
})
</script>
