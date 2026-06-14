import { useMutation, useQuery } from '@tanstack/vue-query'
import { getContact, sendContact } from './contactApi'

const useGetContact = (query) => {
  return useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ['contact', query],
    queryFn: () => getContact(query?.value),
  })
}

export const useSendContact = () => {
  return useMutation({
    mutationFn: sendContact,
  })
}
export { useGetContact }
