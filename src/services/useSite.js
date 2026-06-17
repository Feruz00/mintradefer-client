import { useQuery } from '@tanstack/vue-query'

import { getSite } from './sitesApi'

const usegetSite = (query) => {
  return useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ['site', query],
    queryFn: () => getSite(query?.value),
  })
}
export { usegetSite }
