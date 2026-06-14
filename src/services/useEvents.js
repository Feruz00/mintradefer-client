import { useQuery } from '@tanstack/vue-query'
import { getEvent, getEvents } from './eventApi'
import { computed } from 'vue'

const useGetEvents = (query) => {
  return useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ['events', query],
    queryFn: () => getEvents(query?.value),
  })
}

const useGetEvent = (id) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => getEvent(id.value),
    enabled: computed(() => !!id.value),
  })
}
export { useGetEvents, useGetEvent }
