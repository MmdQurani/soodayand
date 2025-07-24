import axios from 'axios'

// این فایل برای تنظیمات پایه‌ی API استفاده می‌شود
const api = axios.create({
  baseURL: 'https://soodayand.ir/api', // آدرس پایه‌ی API
  headers: { 'Content-Type': 'application/json' }, // هدرهای پیش‌فرض
  timeout: 10_000, // زمان انتظار برای پاسخ (۱۰ ثانیه)
})

export default api
