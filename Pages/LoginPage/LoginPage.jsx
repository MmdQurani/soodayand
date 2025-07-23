import React, { useEffect, useState } from 'react';
import { LuRefreshCcw } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi2";

import { useNavigate } from 'react-router-dom';


function LoginPage() {

  const navigate = useNavigate();

  const [nationalId, setNationalId] = useState(''); // کد ملی
  const [password, setPassword] = useState(''); // پسوورد
  const [captchaValue, setCaptchaValue] = useState(''); // کد امنیتی
  const [captchaKey, setCaptchaKey] = useState(''); // کلید کد کپچا
  const [captchaImage, setCaptchaImage] = useState(''); // یو آر الی تصویر کپچا

  // تابع تولید یک عدد ۸ رقمی تصادفی
  const generateCaptchaKey = () => {
    return String(Math.floor(10000000 + Math.random() * 90000000));
  };

  // گت کردن عکس کد کپچا
  const fetch_Captcha_Img = async (key) => {
    const res = await fetch(`https://soodayand.ir/api/Captcha/CaptchaImage?key=${key}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setCaptchaImage(url);
  }

  // در اولین رندر کامپوننت، یک کپچا جدید ایجاد میشود
  useEffect(() => {
    const key = generateCaptchaKey();
    setCaptchaKey(key);
  }, []);

  // هر زمان که captchaKey تغییر کند، تصویر blob آن را دریافت کن
  useEffect(() => {
    if (!captchaKey) return;
    fetch_Captcha_Img(captchaKey);
  }, [captchaKey]);

  // وقتی کاربر روی دکمه رفرش کلیک کرد، کپچا را بازتولید کن
  const handleRefreshCaptcha = () => {
    setCaptchaKey(generateCaptchaKey());
    setCaptchaValue('');
  };

  // پست کردن مقادیر داخل فرم به سمت api
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username: nationalId,
      password,
      captchaKey,
      captchaValue,
    };

    try {
      const res = await fetch('https://soodayand.ir/api/UserManagement/SimpleLogin',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const promiseData = await res.json();

      if (promiseData.isSuccess) {
        // 1. ذخیره توکن در localStorage
        localStorage.setItem('Token', promiseData.data.token);

        // 2. هدایت کاربر به صفحه خانه
        navigate('/');
      } else {
        alert('نام‌کاربری یا رمز عبور اشتباه است');
      }
    } catch (error) {
      console.error(error);
      alert('خطا در برقراری ارتباط با سرور');
    }
  };


  return (
    <div className="h-auto w-full">
      <div className="w-full grid grid-cols-2">
        <Main_Image_Login_Page />

        <div className="md:col-span-1 col-span-2">
          <div className="w-full min-h-[100vh] flex justify-center items-center bg-white">
            <div className="h-auto max-w-[90%] xl:min-w-1/2 min-w-3/4 flex flex-col justify-center items-center gap-y-6">

              <img className="w-auto h-52" src="../../public/images/Logo/ayandeh-logo-wQfiaaYx.png" alt="لوگو" />

              <div className="bg-gray-200/60 h-12 w-full max-w-md rounded-md grid grid-cols-2 gap-x-6 px-3 py-1">
                <button className="cursor-pointer text-sm">ورود با موبایل</button>
                <button className="cursor-pointer bg-white rounded-md shadow_login_btn text-sm">
                  ورود با نام کاربری و رمز عبور
                </button>
              </div>

              {/* مقادیر مربوط به فرم */}
              <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md">

                {/* فیلد کد ملی */}
                <Login_Input lable="کد ملی / شناسه ملی">
                  <HiOutlineUserCircle className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    value={nationalId}
                    onChange={e => setNationalId(e.target.value)}
                    className="w-full p-5 py-2 border border-gray-300 focus:border-gray-500 rounded-lg focus:outline-none"
                    dir="rtl"
                  />
                </Login_Input>

                {/* فیلد رمز عبور */}
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

                {/* فیلد کپچا */}
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
                      <img className="object-contain" src={captchaImage} alt="کد امنیتی" />

                      <input
                        type="text"
                        value={captchaValue}
                        onChange={e => setCaptchaValue(e.target.value)}
                        placeholder="کد را وارد کنید"
                        className=" flex-1 w-full p-2 focus:outline-none"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </Login_Input>

                {/* دکمه ارسال */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={`w-full font-medium py-2 rounded-lg ${nationalId && password && captchaValue ? 'bg-amber-700 text-white' : 'bg-gray-300 text-white'}`}
                >
                  {nationalId && password && captchaValue ? 'ادامه' : ' ورود به سودآیند'}
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

function Login_Input({ lable, children }) {
  return (
    <div className="mb-5">
      <label htmlFor="nationalId" className="block text-gray-700 mb-2" dir="rtl">
        {lable}
      </label>
      <div className="relative">{children}</div>
    </div>
  );
}

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
