import http from '../utils/http'

const server = import.meta.env.VITE_API_URL

const getEnterprises = (queryKey = {}) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${server}/api/enterprises/client`, {
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
const getEnterprise = (id) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${server}/api/enterprises/client/${id}`, {
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
export { getEnterprises, getEnterprise }
