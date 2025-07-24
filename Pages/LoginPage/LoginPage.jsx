import React, { useEffect, useState, useCallback } from 'react'
import { LuRefreshCcw } from 'react-icons/lu'
import { CiLock } from 'react-icons/ci'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

import { getCaptchaImage } from '../../src/APIs/api/captcha.service'
import { loginUser } from '../../src/APIs/api/auth.service'
import Login_Input from '../../Components/Login_Input/Login_Input'

export default function LoginPage() {
  const navigate = useNavigate()

  const [nationalId, setNationalId] = useState('')
  const [password, setPassword] = useState('')
  const [captchaValue, setCaptchaValue] = useState('')
  const [captchaKey, setCaptchaKey] = useState('')
  const [captchaImage, setCaptchaImage] = useState('')
  const [loading, setLoading] = useState(false)

  // تولید کلید ۸ رقمی
  const generateCaptchaKey = useCallback(() => {
    return String(Math.floor(10000000 + Math.random() * 90000000))
  }, [])

  // ایکسکشن اول: مقداردهی اولیه‌ی کلید
  useEffect(() => {
    setCaptchaKey(generateCaptchaKey())
  }, [generateCaptchaKey])

  // ایکسکشن دوم: هنگام تغییر کی، درخواست کپچا بده
  useEffect(() => {
    if (!captchaKey) return

    let active = true
    setLoading(true)

    getCaptchaImage(captchaKey)
      .then(url => {
        if (active) {
          setCaptchaImage(url)
        }
      })
      .catch(err => {
        console.error(err)
        alert(err.message)
      })
      .finally(() => active && setLoading(false))

    // Cleanup: ری‌وُک URL و جلوگیری از setState بعد آن‌ماونت
    return () => {
      active && captchaImage && URL.revokeObjectURL(captchaImage)
      active = false
    }
  }, [captchaKey])

  // ریفرش کپچا
  const handleRefreshCaptcha = () => {
    setCaptchaValue('')
    setCaptchaKey(generateCaptchaKey())
  }

  // ارسال فرم
  const handleSubmit = async e => {
    e.preventDefault()
    if (!nationalId || !password || !captchaValue) {
      alert('لطفاً تمام فیلدها را پر کنید')
      return
    }

    try {
      setLoading(true)
      const result = await loginUser({
        username: nationalId,
        password,
        captchaKey,
        captchaValue,
      })

      if (result.isSuccess) {
        localStorage.setItem('Token', result.data.token)
        navigate('/')
      } else {
        alert('نام‌کاربری یا رمز عبور اشتباه است')
      }
    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-auto w-full">
      <div className="w-full grid grid-cols-2">
        <Main_Image_Login_Page />

        <div className="md:col-span-1 col-span-2">
          <div className="w-full min-h-[100vh] flex justify-center items-center bg-white">
            <div className="h-auto max-w-[90%] xl:min-w-1/2 min-w-3/4 flex flex-col justify-center items-center gap-y-6">

              <img
                className="w-auto h-52"
                src="/images/Logo/ayandeh-logo-wQfiaaYx.png"
                alt="لوگو"
              />

              <div className="bg-gray-200/60 h-12 w-full max-w-md rounded-md grid grid-cols-2 gap-x-6 px-3 py-1">
                <button className="text-sm">ورود با موبایل</button>
                <button className="bg-white rounded-md shadow_login_btn text-sm">
                  ورود با نام کاربری و رمز عبور
                </button>
              </div>

              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <Login_Input lable="کد ملی / شناسه ملی">
                  <HiOutlineUserCircle className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={nationalId}
                    onChange={e => setNationalId(e.target.value)}
                    className="w-full p-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                    dir="rtl"
                  />
                </Login_Input>

                <Login_Input lable="رمز عبور">
                  <CiLock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                    dir="rtl"
                  />
                </Login_Input>

                <Login_Input lable="کد امنیتی">
                  <div className="flex gap-x-2">
                    <button
                      type="button"
                      onClick={handleRefreshCaptcha}
                      className="border border-gray-300 rounded-lg p-2"
                      disabled={loading}
                    >
                      <LuRefreshCcw className="text-xl" />
                    </button>
                    <div className="flex-1 px-2 border border-gray-300 rounded-lg flex items-center">
                      {loading
                        ? <span className="text-gray-500">در حال بارگذاری...</span>
                        : <img
                          src={captchaImage}
                          alt="کد امنیتی"
                          className="object-contain max-h-10"
                        />
                      }
                      <input
                        type="text"
                        value={captchaValue}
                        onChange={e => setCaptchaValue(e.target.value)}
                        placeholder="کد را وارد کنید"
                        className="flex-1 p-2 focus:outline-none"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </Login_Input>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-lg font-medium mt-4 transition
                    ${nationalId && password && captchaValue
                      ? 'bg-amber-700 text-white'
                      : 'bg-gray-300 text-white cursor-not-allowed'
                    }`}
                >
                  {loading
                    ? 'در حال ارسال...'
                    : nationalId && password && captchaValue
                      ? 'ادامه'
                      : 'ورود به سودآیند'
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// کامپوننت تصویر سمت چپ
function Main_Image_Login_Page() {
  return (
    <div className="md:col-span-1 hidden md:flex items-center justify-center bg-imageBg p-8">
      <div className="w-full h-full max-w-lg">
        <img
          src="/images/Auth/ayandehB-CMuCKqwn.webp"
          alt="عکس لاگین"
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  )
}
