import { useQuery } from '@tanstack/vue-query'
import { getPost, getPosts } from './postsApi'
import { computed } from 'vue'

const useGetPosts = (query) => {
  return useQuery({
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    queryKey: ['posts', query],
    queryFn: () => getPosts(query?.value),
  })
}

const useGetPost = (id) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id.value),
    enabled: computed(() => !!id.value),
  })
}

export { useGetPosts, useGetPost }
