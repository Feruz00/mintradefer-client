<template>
  <div
    class="grid grid-flow-col gap-4 px-6 py-2 auto-cols-max rounded-2xl shadow-two w-max backdrop-blur-[20px] place-self-end mr-14 shadow-2xl"
    style="
      background: linear-gradient(
        133deg,
        rgba(255, 255, 255, 0.6) 0%,
        rgba(255, 255, 255, 0.4) 100%
      );
    "
  >
    <button @click="handlePrevious" class="text-base font-medium text-black cursor-pointer">
      {{ t('back') }}
    </button>

    <template v-for="(page, idx) in pagesToShow" :key="`${page}-${idx}`">
      <span v-if="page === '...'" class="text-base font-medium pagination-ellipsis text-black">
        ...
      </span>

      <button
        v-else
        @click="emit('pageChange', page)"
        class="font-medium text-black text-base cursor-pointer"
        :class="page === currentPage ? 'bg-indigo-800 p-2 px-4 rounded-md text-white' : ''"
      >
        {{ page }}
      </button>
    </template>

    <button @click="handleNext" class="text-base font-medium text-black cursor-pointer">
      {{ t('next') }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['pageChange'])

const { t } = useI18n()

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const handlePrevious = () => {
  if (props.currentPage > 1) {
    emit('pageChange', props.currentPage - 1)
  }
}

const handleNext = () => {
  if (props.currentPage < totalPages.value) {
    emit('pageChange', props.currentPage + 1)
  }
}

const pagesToShow = computed(() => {
  const total = totalPages.value
  const current = props.currentPage

  if (total <= 5) {
    return Array.from({ length: total }, (_, idx) => idx + 1)
  }

  if (current <= 3) {
    return [1, 2, 3, 4, '...', total]
  }

  if (current >= total - 2) {
    return [1, '...', total - 3, total - 2, total - 1, total]
  }

  return [1, '...', current - 1, current, current + 1, '...', total]
})
</script>
