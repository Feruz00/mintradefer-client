import axios from 'axios'

const server = import.meta.env.VITE_API_URL

const http = axios.create({
  baseURL: server,
  withCredentials: true,
})

let isRefreshing = false
let refreshSubscribers = []

// Subscribe to token refresh
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

function onRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken))
  refreshSubscribers = []
}

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config

    // If not a 401, just reject
    if (error.response?.status !== 401) {
      return Promise.reject(error)
    }

    // 👇 Skip refresh logic if on login page
    if (window.location.pathname.startsWith('/login')) {
      return Promise.reject(error)
    }

    // Prevent retry loop
    if (prevRequest._retry) {
      return Promise.reject(error)
    }

    prevRequest._retry = true

    // If refresh request itself failed → go to login
    if (prevRequest.url.includes('/auth/refresh-token')) {
      window.location.href = '/login'
      return Promise.reject(error)
    }

    try {
      const response = await axios.post(
        `${server}/api/auth/refresh-token`,
        {},
        { withCredentials: true },
      )

      const token = response.data.data
      // console.log('Bearer token edildi adminkada', token)
      prevRequest.headers.Authorization = `Bearer ${token}`

      return http(prevRequest)
    } catch (refreshError) {
      // Redirect to login only if not already there
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
      return Promise.reject(refreshError)
    }
  },
)

export default http
