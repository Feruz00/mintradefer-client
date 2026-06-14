import { useQuery } from '@tanstack/vue-query'

import { getTender, getTenders } from './tenderApi'
import { computed } from 'vue'

const useGetTenders = (query) => {
  return useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ['tenders', query],
    queryFn: () => getTenders(query?.value),
  })
}

const useGetTender = (id) => {
  return useQuery({
    queryKey: ['tender', id],
    queryFn: () => getTender(id.value),
    enabled: computed(() => !!id.value),
  })
}
export { useGetTenders, useGetTender }
