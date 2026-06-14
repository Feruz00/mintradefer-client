<template>
  <div
    class="w-full flex flex-col items-center justify-center text-center px-6 py-12 sm:py-16 lg:py-20"
  >
    <!-- Icon -->
    <div
      class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-6"
    >
      <InboxOutlined class="text-4xl sm:text-5xl text-indigo-700" />
    </div>

    <!-- Title -->
    <h2 class="text-xl sm:text-2xl lg:text-3xl font-semibold text-indigo-900 mb-3">
      {{ title }}
    </h2>

    <!-- Description -->
    <p class="max-w-md text-sm sm:text-base text-indigo-700 leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
import { InboxOutlined } from '@ant-design/icons-vue'

defineProps({
  title: {
    type: String,
    default: 'No Data Found',
  },
  description: {
    type: String,
    default: 'There is currently no information available to display.',
  },
})
</script>
