import { useQuery } from '@tanstack/vue-query'

import { getExpo } from './expoApi'

const useGetExpo = (query) => {
  return useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ['expo', query],
    queryFn: () => getExpo(query?.value),
  })
}
export { useGetExpo }
