import http from '../utils/http'

const server = import.meta.env.VITE_API_URL

const getEvents = (queryKey = {}) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${server}/api/events/client`, {
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

const getEvent = (id) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${server}/api/events/client/${id}`, {
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

export { getEvents, getEvent }
