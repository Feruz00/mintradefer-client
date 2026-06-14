import { useQuery } from '@tanstack/vue-query'
import { getBanner } from './bannerApi'

const useGetBanner = (query) => {
  return useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ['banner', query],
    queryFn: () => getBanner(query?.value),
  })
}
export { useGetBanner }
