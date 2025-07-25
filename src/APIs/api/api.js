// src/APIs/api/api.js
import axios from 'axios'

// تنظیمات پایه‌ی API
const api = axios.create({
  baseURL: 'https://soodayand.ir/api',            // آدرس پایه‌ی API
  headers: { 'Content-Type': 'application/json' }, // هدر پیش‌فرض
  timeout: 10_000                                 // زمان انتظار (۱۰ ثانیه)
})

// interceptor برای اضافه کردن خودکار توکن به هدر Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
