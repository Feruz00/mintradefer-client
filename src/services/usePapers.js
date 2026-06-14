import { useQuery } from '@tanstack/vue-query'

import { getPapers } from './papersApi'

const useGetPapers = (query) => {
  return useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ['papers', query],
    queryFn: () => getPapers(query?.value),
  })
}
export { useGetPapers }
