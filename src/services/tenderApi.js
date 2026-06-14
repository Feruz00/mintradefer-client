import http from '../utils/http'

const server = import.meta.env.VITE_API_URL

const getTenders = (queryKey = {}) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${server}/api/tenders/client`, {
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

const getTender = (id) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${server}/api/tenders/client/${id}`, {
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

export { getTenders, getTender }
