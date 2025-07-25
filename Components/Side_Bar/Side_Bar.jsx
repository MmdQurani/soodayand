import React from 'react'
import Link_Item from '../Link_Item/Link_Item'
import { SlHome } from "react-icons/sl";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineReport } from "react-icons/md";
import { IoGiftOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from 'react-icons/hi';
import { LuMessageCircleMore } from "react-icons/lu";

function Side_Bar() {
  return (
    <>
      {/* سایدبار با ارتفاع حداکثر یک مانیتور و استیکی */}
      <aside className="w-80 card_style sticky top-4 max-h-[96vh] min-h-[95vh] overflow-y-auto p-4 lg:flex flex-col hidden">
        <div className="text-white text-lg font-bold flex justify-start items-center border-b-1 border-gray-300 py-2 mb-2">
          <img src="../../public/images/Logo/AyandehLogo-CbE1UbbU.svg" className='w-2/3 object-contain' alt="لوگو" />
        </div>
        <ul className="space-y-2 text-gray-700" dir='rtl'>

          <Link_Item href='/' text="داشبورد">
            <SlHome className='inline-block text-xl' />
          </Link_Item>
          <Link_Item href='/' text="سرمایه گذاری">
            <RiMoneyDollarCircleLine className='inline-block text-xl' />
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
    </>
  )
}

export default Side_Bar