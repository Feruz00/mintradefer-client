import http from '../utils/http'

const server = import.meta.env.VITE_API_URL

const getContact = (queryKey = {}) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${server}/api/contact/client`, {
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

const sendContact = (data) => {
  return new Promise((resolve, reject) => {
    http
      .post(`${server}/api/messages`, data, {
        withCredentials: true,
      })
      .then(async (res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export { getContact, sendContact }
