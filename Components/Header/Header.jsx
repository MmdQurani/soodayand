import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { SlHome } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2'
import { IoMdNotificationsOutline } from 'react-icons/io'

import Date_Day from '../Date_Day/Date_Day'

function Header() {
  return (
    <header className='w-auto h-12 top-4 sticky'>
      {/* محتوای هدر برای اندازه های بزرگتر از تبلت */}
      <div className='w-full h-full lg:flex hidden'>

        <div className='w-full h-full grid grid-cols-12 gap-x-3 text-gray-500'>

          {/* نام صفحه */}
          <div className='xl:col-span-5 col-span-3 bg-white hover:text-gray-800 hover:shadow-md transition-all duration-100 rounded-md flex items-center px-4'>
            <SlHome className='inline-block text-xl' />
            <span className='text-md font-bold mr-2'>داشبورد</span>
          </div>

          {/* نام کاربر */}
          <div className='col-span-3 bg-white hover:text-gray-800 hover:shadow-md transition-all duration-100 rounded-md flex items-center px-4'>
            <HiOutlineUserCircle className='inline-block text-xl' />
            <Link to='/' className='text-sm font-bold mr-1'>مرتضی آقاپور</Link>
          </div>

          {/* تاریخ شمسی */}
          <div className='xl:col-span-3 col-span-4 cursor-pointer bg-white hover:text-gray-800 hover:shadow-md transition-all duration-100 rounded-md flex items-center justify-between px-4'>
            <div>
              <HiOutlineUserCircle className='inline-block text-xl' />
              <span className='text-sm font-bold mr-1'>تاریخ روز :</span>
            </div>

            {/* اینجا کامپوننت تاریخ شمسی  */}
            <Date_Day />
          </div>

          {/* آیکون‌های اعلان و خروج */}
          <div className='xl:col-span-1 col-span-2 h-full flex flex-row justify-around items-center gap-x-2'>
            <button className='cursor-pointer bg-white hover:text-gray-800 hover:shadow-md transition-all duration-100 rounded-md flex items-center justify-center w-full h-full'>
              <IoMdNotificationsOutline className='inline-block text-2xl text-gray-500' />
            </button>

            <button className='cursor-pointer bg-white hover:text-gray-800 hover:shadow-md transition-all duration-100 rounded-md flex items-center justify-center w-full h-full'>
              <HiArrowLeftStartOnRectangle className='inline-block text-2xl text-gray-500' />
            </button>
          </div>

        </div>

      </div>

      {/* محتوای هدر برای اندازه های تبلت و کوچکتر از تبلت */}
      <div className='w-full h-full lg:hidden flex flex-row justify-between items-center bg-white rounded-md px-4'>
        <div className='max-w-[100px] h-full flex items-center justify-center gap-x-2'>
          <img src="../../public/images/Logo/AyandehLogo-CbE1UbbU.svg" className='w-full object-contain' alt="لوگو" />
        </div>

        <div className='max-w-max h-max px-4 py-2 rounded-md flex items-center justify-center gap-x-2 bg-gray-100'>
          {/* <HiOutlineUserCircle className='inline-block text-2xl' /> */}
          <Link to='/' className='text-sm font-bold'>مرتضی آقاپور</Link>
        </div>

        <div className='max-w-max h-full flex items-center justify-center gap-x-2'>
          <button className='cursor-pointer hover:text-gray-800 rounded-full flex items-center justify-center w-8 h-8 bg-gray-100 hover:shadow-md transition-all duration-100'>
            <IoMdNotificationsOutline className='inline-block text-2xl text-gray-500' />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
