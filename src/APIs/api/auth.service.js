import api from './api'

/**
 * ارسال فرم لاگین و دریافت نتیجه
 * @param {{ username: string, password: string, captchaKey: string, captchaValue: string }} credentials // اطلاعات کاربری برای لاگین
 * @returns {Promise<any>} // نتیجه لاگین
 */

export async function loginUser(credentials) {
  try {
    // ارسال درخواست لاگین به سرور
    const { data } = await api.post('/UserManagement/SimpleLogin', credentials)
    return data
  } catch (err) {
    // مدیریت خطاها
    const msg = err.response?.data?.message || 'خطا در برقراری ارتباط با سرور'
    throw new Error(msg)
  }
}
