<template>
  <div
    class="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
  >
    <!-- IMAGE -->
    <img
      :src="image"
      class="w-full h-[220px] sm:h-[280px] object-cover group-hover:scale-105 transition-transform duration-300"
    />

    <!-- BADGE -->
    <div
      class="absolute top-3 left-3 px-3 py-1 rounded-full bg-indigo-600 text-white text-sm font-semibold"
    >
      {{ index + 1 }}
    </div>

    <!-- CONTENT -->
    <div
      class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-indigo-950/90 via-indigo-900/40 to-transparent"
    >
      <h2 class="text-white font-semibold text-base sm:text-lg line-clamp-2">
        {{ title }}
      </h2>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  image: String,
  index: Number,
})
</script>
