import http from '../utils/http'

const server = import.meta.env.VITE_API_URL

const getBanner = (queryKey = {}) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${server}/api/banner/client`, {
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

export { getBanner }
