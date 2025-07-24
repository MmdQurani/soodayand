import React, { useState, useEffect } from 'react'
import { toJalaali } from 'jalaali-js'

// کامپوننت تاریخ شمسی
const Date_Day = () => {
  // از useState برای مدیریت وضعیت تاریخ استفاده می‌کنیم
  const [jalaliDate, setJalaliDate] = useState('')

  // این تابع هر بار که کامپوننت رندر می‌شود، تاریخ را به‌روز می‌کند
  useEffect(() => {

    // تاریخ فعلی را می‌گیریم
    const now = new Date()

    // تبدیل تاریخ میلادی به شمسی
    const { jy, jm, jd } = toJalaali(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    )

    // فرمت تاریخ شمسی را تنظیم می‌کنیم
    // و آن را در وضعیت ذخیره می‌کنیم
    const pad = (n) => n.toString().padStart(2, '0')
    setJalaliDate(`${jy}/${pad(jm)}/${pad(jd)}`)
  }, [])

  return (
    <span className='text-sm font-bold text-gray-700 mr-1 bg-badgeBg px-2 py-1 rounded-md'>
      {jalaliDate}
    </span>
  )
}

export default Date_Day
