// src/Components/LoginPage.jsx
import React, { useEffect, useState } from 'react';
import { LuRefreshCcw } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

import { getCaptchaImage, loginUser } from '../../APIs/CallApi/CallApi';
import Login_Input from '../../Components/Login_Input/Login_Input';

function LoginPage() {

  // استفاده از useNavigate برای هدایت کاربر بعد از لاگین موفق
  const navigate = useNavigate();

  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');

  // تولید کلید ۸ رقمی کپچا
  const generateCaptchaKey = () =>
    String(Math.floor(10000000 + Math.random() * 90000000));

  // در اولین رندر یک کپچا جدید بساز
  useEffect(() => {
    setCaptchaKey(generateCaptchaKey());
  }, []);

  // هرگاه کلید کپچا تغییر کرد، تصویر جدید بگیر
  useEffect(() => {

    // اگر کلید کپچا وجود ندارد، هیچ کاری نکن
    // این کار برای جلوگیری از خطا در بارگذاری تصویر کپچا است
    // در صورتی که کلید کپچا وجود نداشته باشد، تابع getCaptchaImage اجرا نخواهد شد
    if (!captchaKey) return;

    // دریافت تصویر کپچا
    getCaptchaImage(captchaKey)
      .then(url => setCaptchaImage(url))
      // اگر خطایی در دریافت تصویر بود، آن را در کنسول نمایش بده
      .catch(err => console.error(err));
  }, [captchaKey]);

  // تابع برای ریفرش کپچا
  const handleRefreshCaptcha = () => {
    setCaptchaKey(generateCaptchaKey());
    setCaptchaValue('');
  };

  // تابع برای ارسال فرم لاگین
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // اگر فیلدهای ضروری پر نشده‌اند، پیام خطا نمایش بده
      if (!nationalId || !password || !captchaValue) {
        alert('لطفاً تمام فیلدها را پر کنید');
        return;
      }

      // ارسال درخواست لاگین به سرور
      const result = await loginUser({
        username: nationalId,
        password,
        captchaKey,
        captchaValue,
      });

      // اگر لاگین موفق بود، توکن را در لوکال استوریج ذخیره کن و به صفحه اصلی برو
      if (result.isSuccess) {
        localStorage.setItem('Token', result.data.token);
        navigate('/');
      } else {
        alert('نام‌کاربری یا رمز عبور اشتباه است');
      }
    } catch (error) {
      // اگر خطایی در ارسال درخواست بود، آن را در کنسول نمایش بده
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="h-auto w-full">
      <div className="w-full grid grid-cols-2">
        <Main_Image_Login_Page />

        <div className="md:col-span-1 col-span-2">
          <div className="w-full min-h-[100vh] flex justify-center items-center bg-white">
            <div className="h-auto max-w-[90%] xl:min-w-1/2 min-w-3/4 flex flex-col justify-center items-center gap-y-6">
              <img
                className="w-auto h-52"
                src="../../public/images/Logo/ayandeh-logo-wQfiaaYx.png"
                alt="لوگو"
              />

              <div className="bg-gray-200/60 h-12 w-full max-w-md rounded-md grid grid-cols-2 gap-x-6 px-3 py-1">
                <button className="cursor-pointer text-sm">
                  ورود با موبایل
                </button>
                <button className="cursor-pointer bg-white rounded-md shadow_login_btn text-sm">
                  ورود با نام کاربری و رمز عبور
                </button>
              </div>

              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <Login_Input lable="کد ملی / شناسه ملی">
                  <HiOutlineUserCircle className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    value={nationalId}
                    onChange={e => setNationalId(e.target.value)}
                    className="w-full p-5 py-2 border border-gray-300 focus:border-gray-500 rounded-lg focus:outline-none"
                    dir="rtl"
                  />
                </Login_Input>

                <Login_Input lable="رمز عبور">
                  <CiLock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-5 py-2 border border-gray-300 focus:border-gray-500 rounded-lg focus:outline-none"
                    dir="rtl"
                  />
                </Login_Input>

                <Login_Input lable="کد امنیتی">
                  <div className="flex gap-x-2">
                    <button
                      type="button"
                      onClick={handleRefreshCaptcha}
                      className="border border-gray-300 rounded-lg p-2 cursor-pointer"
                    >
                      <LuRefreshCcw className="text-xl" />
                    </button>

                    <div className="flex-1 px-2 border border-gray-300 rounded-lg flex items-center">
                      <img
                        className="object-contain"
                        src={captchaImage}
                        alt="کد امنیتی"
                      />
                      <input
                        type="text"
                        value={captchaValue}
                        onChange={e => setCaptchaValue(e.target.value)}
                        placeholder="کد را وارد کنید"
                        className="flex-1 w-full p-2 focus:outline-none"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </Login_Input>

                <button
                  type="submit"
                  className={`w-full font-medium py-2 rounded-lg ${nationalId && password && captchaValue
                    ? 'bg-amber-700 text-white cursor-pointer'
                    : 'bg-gray-300 text-white'
                    }`}
                >
                  {nationalId && password && captchaValue
                    ? 'ادامه'
                    : ' ورود به سودآیند'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

function Main_Image_Login_Page() {
  return (
    <div className="md:col-span-1 min-h-[100vh] md:flex items-center justify-center hidden bg-imageBg p-8">
      <div className="w-full h-full max-w-lg">
        <img
          src="../../public/images/Auth/ayandehB-CMuCKqwn.webp"
          alt="عکس لاگین"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
