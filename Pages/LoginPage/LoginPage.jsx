import React, { useEffect, useState } from 'react';
import { LuRefreshCcw } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi2";

function LoginPage() {

  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  useEffect(() => {

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      "username": nationalId,
      "password": password,
    }

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  }

  return (
    <div className='h-auto w-full'>
      <div className='w-full grid grid-cols-2'>

        <Main_Image_Login_Page />

        <div className='md:col-span-1 col-span-2 '>

          <div className='w-full min-h-[100vh] flex justify-center items-center bg-white'>

            <div className='h-auto max-w-[90%] xl:min-w-1/2 min-w-3/4 flex flex-col justify-center items-center gap-y-6'>
              <img className='w-auto h-52' src="../../public/images/Logo/ayandeh-logo-wQfiaaYx.png" alt="" />

              <div className='bg-gray-200/60 h-12 w-full rounded-md grid grid-cols-2 gap-x-6 px-3 py-1'>
                <button className='col-span-1 cursor-pointer text-sm'>ورود با موبایل</button>
                <button className='col-span-1 cursor-pointer bg-white rounded-md shadow_login_btn text-sm'>ورود با نام کاربری و رمز عبور</button>
              </div>

              <div className="w-full flex items-center justify-center">
                <form
                  onSubmit={() => e.preventDefault()}
                  className="w-full max-w-sm"
                >

                  {/* کد ملی / شناسه ملی */}
                  <Login_Input lable={`کد ملی / شناسه ملی`}>
                    <HiOutlineUserCircle className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      id="nationalId"
                      type="text"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      className="w-full p-5 py-2 border border-gray-300 focus:border-gray-500 rounded-lg focus:outline-none "
                      dir='rtl'
                    />
                  </Login_Input>

                  {/* رمز عبور */}
                  <Login_Input lable={`رمز عبور`}>
                    <CiLock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-5 py-2 border border-gray-300 focus:border-gray-500 rounded-lg focus:outline-none "
                      dir='rtl'
                    />
                  </Login_Input>

                  {/* کد کپچا */}
                  <Login_Input lable={`کد امنیتی`}>
                    <div className='flex flex-row gap-x-1'>

                      <button className='border border-gray-300 rounded-lg px-3 cursor-pointer'>
                        <LuRefreshCcw className='text-xl' />
                      </button>

                      <div className='flex-1 px-2 border border-gray-300 rounded-lg flex flex-row'>
                        <img src="../../public/images/Auth/41b186a9-4f87-41fd-8c4c-5dcd14c8e4fa.jpeg" className='object-contain' alt="کد امنیتی" />
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full p-5 py-2 border-0 focus:outline-none "
                          dir='rtl'
                        />
                      </div>
                    </div>
                  </Login_Input>

                  {/* دکمه ورود */}
                  <button
                    type="submit"
                    className="w-full bg-gray-300 text-white font-medium py-2 rounded-lg transition"
                  >
                    ورود به سودآیند
                  </button>
                </form>
              </div>


            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

// function LoginForm() {
//   const [nationalId, setNationalId] = useState('');
//   const [password, setPassword] = useState('');
//   const [captchaInput, setCaptchaInput] = useState('');

//   useEffect(() => {

//   }, [])

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const payload = {
//       "username": nationalId,
//       "password": password,
//     }

//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     })
//   }

//   return (
//     <div className="w-full flex items-center justify-center">
//       <form
//         onSubmit={() => e.preventDefault()}
//         className="w-full max-w-sm"
//       >

//         {/* کد ملی / شناسه ملی */}
//         <Login_Input lable={`کد ملی / شناسه ملی`}>
//           {/* <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" /> */}
//           <input
//             id="nationalId"
//             type="text"
//             value={nationalId}
//             onChange={(e) => setNationalId(e.target.value)}
//             className="w-full p-5 py-2 border border-gray-300 focus:border-gray-500 rounded-lg focus:outline-none "
//             dir='rtl'
//           />
//         </Login_Input>

//         {/* رمز عبور */}
//         <Login_Input lable={`رمز عبور`}>
//           {/* <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" /> */}
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-5 py-2 border border-gray-300 focus:border-gray-500 rounded-lg focus:outline-none "
//             dir='rtl'
//           />
//         </Login_Input>

//         {/* دکمه ورود */}
//         <button
//           type="submit"
//           className="w-full bg-gray-300 text-white font-medium py-2 rounded-lg transition"
//         >
//           ورود به سودآیند
//         </button>
//       </form>
//     </div>
//   );
// }

function Login_Input({ lable, children }) {
  return (
    <div className="mb-5">
      <label
        htmlFor="nationalId"
        className="block text-gray-700 mb-2"
        dir='rtl'
      >
        {lable}
      </label>
      <div className="relative">
        {children}
      </div>
    </div>
  )
}

function Main_Image_Login_Page() {
  return (
    <>
      <div className="md:col-span-1 min-h-[100vh] md:flex items-center justify-center hidden bg-imageBg p-8">
        <div className="w-full h-full max-w-lg">
          <img
            src='../../public/images/Auth/ayandehB-CMuCKqwn.webp'
            alt="عکس لاگین"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </>
  )
}

export default LoginPage
