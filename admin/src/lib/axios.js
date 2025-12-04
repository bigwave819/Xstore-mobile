import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.VITE_API_URL,
    withCredentials: true
})

export default axiosInstance