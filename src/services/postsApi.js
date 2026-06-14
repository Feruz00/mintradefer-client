import http from '../utils/http'

const server = import.meta.env.VITE_API_URL

const getPosts = (queryKey = {}) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${server}/api/posts/client`, {
        params: queryKey,
        withCredentials: true,
      })
      .then(async (res) => {
        const { data } = res

        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getPost = (id) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${server}/api/posts/client/${id}`, {
        withCredentials: true,
      })
      .then(async (res) => {
        const { data } = res

        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export { getPosts, getPost }
