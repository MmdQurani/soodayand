// دریافت تصویر کپچا به‌صورت blob URL
export async function getCaptchaImage(key) {

  // ارسال درخواست به سرور برای دریافت تصویر کپچا
  const res = await fetch(`https://soodayand.ir/api/Captcha/CaptchaImage?key=${key}`);

  // اگر پاسخ موفق نبود، خطا ایجاد کن
  if (!res.ok) {
    throw new Error('خطا در دریافت تصویر کپچا');
  }

  // تبدیل پاسخ به blob و ایجاد URL برای نمایش تصویر
  // این کار باعث می‌شود که تصویر به‌صورت محلی در مرورگر ذخیره
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}


// ارسال فرم لاگین و دریافت پاسخ
export async function loginUser({ username, password, captchaKey, captchaValue }) {
  // ارسال درخواست لاگین به سرور
  const res = await fetch('https://soodayand.ir/api/UserManagement/SimpleLogin',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, captchaKey, captchaValue }),
    }
  );
  if (!res.ok) {
    throw new Error('خطا در برقراری ارتباط با سرور');
  }
  return res.json();
}
