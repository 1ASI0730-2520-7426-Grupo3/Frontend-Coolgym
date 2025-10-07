import axios from 'axios'

export const http = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 8000
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error HTTP:', error.message)
    return Promise.reject(error)
  }
)
