import React from 'react'
import { Link } from 'react-router-dom'
import Link_Item from '../../Components/Link_Item/Link_Item';
import { SlHome } from "react-icons/sl";
import { RxCamera } from "react-icons/rx";
import { MdOutlineReport } from "react-icons/md";
import { IoGiftOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from 'react-icons/hi';
import { LuMessageCircleMore } from "react-icons/lu";

function Home() {
  return (
    <div className="mx-auto w-[98%] 2xl:container">

      <div className="flex gap-x-2">

        {/* محتوای اصلی */}
        <main className="flex-1 bg-red-400 p-4">
          {/* شبیه‌سازی محتوای طولانی */}
          {Array.from({ length: 50 }).map((_, i) => (
            <p key={i} className="mb-2">
              این یک پاراگراف تست برای نمایش اسکرول است. شماره: {i + 1}
            </p>
          ))}
        </main>

        {/* سایدبار با ارتفاع حداکثر یک مانیتور و استیکی */}
        <aside className="w-80 card_style sticky top-4 max-h-[95vh] overflow-y-auto p-4">
          <div className="text-white text-lg font-bold flex justify-end items-center border-b-1 border-gray-300 py-2 mb-2">
            <img src="../../public/images/Logo/AyandehLogo-CbE1UbbU.svg" className='w-2/3 object-contain' alt="" />
          </div>
          <ul className="space-y-2 text-gray-700" dir='rtl'>

            <Link_Item href='/' text="داشبورد">
              <SlHome className='inline-block text-xl' />
            </Link_Item>
            <Link_Item href='/' text="سرمایه گذاری">
              <RxCamera className='inline-block text-xl' />
            </Link_Item>
            <Link_Item href='/' text="گزارشات">
              <MdOutlineReport className='inline-block text-xl' />
            </Link_Item>
            <Link_Item href='/' text="باشگاه مشتریان">
              <IoGiftOutline className='inline-block text-xl' />
            </Link_Item>
            <Link_Item href='/' text="اطلاعات کاربری">
              <HiOutlineUserCircle className='inline-block text-xl' />
            </Link_Item>
            <Link_Item href='/' text="پشتیبانی">
              <LuMessageCircleMore className='inline-block text-xl' />
            </Link_Item>

          </ul>
        </aside>

      </div>
    </div>
  )
}

export default Home
