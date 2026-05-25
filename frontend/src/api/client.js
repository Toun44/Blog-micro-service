import axios from 'axios'

const client = axios.create({
  headers: { 'Content-Type': 'application/json' }
})

client.interceptors.response.use(
  res => res,
  err => {
    const msg = err.response?.data?.message || err.message || 'Erreur réseau'
    return Promise.reject(new Error(msg))
  }
)

export default client
