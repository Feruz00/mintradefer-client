import { useQuery } from '@tanstack/vue-query'

import { getEnterprise, getEnterprises } from './enterprisesApi'
import { computed } from 'vue'

const useGetEnterprises = (query) => {
  return useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ['enterprises', query],
    queryFn: () => getEnterprises(query?.value),
  })
}

const useGetEnterprise = (id) => {
  return useQuery({
    queryKey: ['enterprise', id],
    queryFn: () => getEnterprise(id.value),
    enabled: computed(() => !!id.value),
  })
}
export { useGetEnterprises, useGetEnterprise }
