import api from './api'

/**
 * دریافت تصویر کپچا به‌صورت blob و تبدیل به URL
 * @param {string} key // کلید کپچا
 * @returns {Promise<string>} // URL تصویر کپچا
 */

export async function getCaptchaImage(key) {

  // ارسال درخواست به سرور برای دریافت تصویر کپچا
  try {
    const { data } = await api.get('/Captcha/CaptchaImage', {
      params: { key },
      responseType: 'blob',
    })
    return URL.createObjectURL(data) // تبدیل blob به URL
  } catch (err) {
    const msg = err.response?.statusText || 'خطا در دریافت تصویر کپچا'
    throw new Error(msg)
  }
}
