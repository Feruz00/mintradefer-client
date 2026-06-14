import http from '../utils/http'

const server = import.meta.env.VITE_API_URL

const getCategories = (queryKey = {}) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${server}/api/categories`, {
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

export { getCategories }
