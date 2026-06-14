import { useQuery } from '@tanstack/vue-query'
import { getCategories } from './categoriesApi'

const useGetCategories = (query) => {
  return useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ['categories', query],
    queryFn: () => getCategories(query?.value),
    enabled: !!query.value,
  })
}
export { useGetCategories }
