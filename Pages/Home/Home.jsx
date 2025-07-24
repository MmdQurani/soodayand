import React from 'react'
import Header from '../../Components/Header/Header'
import { IoIosArrowBack } from "react-icons/io";
import { LuWalletCards } from "react-icons/lu";
import { PiCurrencyCircleDollar } from "react-icons/pi";

import Lable_User_Wealth from '../../Components/Lable_User_Wealth/Lable_User_Wealth';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home w-auto min-h-screen flex-1">

      <Header />

      <div className='Main_content w-full min-h-screen max-h-full mt-4'>

        <div className='user_wealth card_style p-4'>

          {/* تایتل بخش دارایی کاربر */}
          <div className='title_box_user_wealth text-gray-700 py-2 pb-6 flex flex-row justify-between items-center border-b-2 border-dashed border-gray-300'>
            <div className='lable_user_wealth'>
              <LuWalletCards className='inline-block text-2xl' />
              <span className='text-md mr-3'>دارایی شما</span>
            </div>

            <button className='cursor-pointer'>
              <span className='text-sm'>سابقه درخواست ها</span>
              <IoIosArrowBack className='inline-block text-xl mr-1' />
            </button>
          </div>

          <div className='grid grid-cols-12 mt-4'>
            {/* نمایش دارایی کاربر بصورت متنی*/}
            <div className='col-span-6'>

              {/* باکس نمایش دارایی */}
              <div className='w-full h-auto px-3'>

                <Lable_User_Wealth wealthText="دارایی کل" wealthAmount="1,000,000" />
                <Lable_User_Wealth wealthText="دارایی در صندوق ها" wealthAmount="1,000,000" />
                <Lable_User_Wealth wealthText="مانده کیف پول کارگزاری" wealthAmount="1,000,000" />
                <Lable_User_Wealth wealthText="مانده قابل برداشت" wealthAmount="1,000,000" />

              </div>

              {/* دکمه های سرمایه گذاری و برداشت */}
              <div className='w-full h-auto px-3 grid grid-cols-6 gap-x-4 mt-4'>
                {/* دکمه سرمایه گذاری */}
                <div className='col-span-3'>
                  <Link to={'/'} className='my-gradient-button transi font-bold w-full py-2 rounded-md flex flex-row justify-center items-center gap-x-2'>
                    <PiCurrencyCircleDollar className='inline-block text-xl' />
                    <span className='text-white'>سرمایه گذاری</span>
                  </Link>
                </div>

                {/* دکمه برداشت وجه */}
                <div className='col-span-3'>
                  <button className='border-1 border-gray-800 text-gray-800 cursor-pointer w-full py-2 rounded-md flex flex-row justify-center items-center gap-x-2'>
                    <PiCurrencyCircleDollar className='inline-block text-xl' />
                    <span>برداشت وجه</span>
                  </button>
                </div>
              </div>
              
            </div>

            {/* نمایش دارایی کاربر با نمودار */}
            <div className='col-span-6 bg-blue-500'>hello world</div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Home
