// src/Pages/Home/Home.jsx
import React from 'react'
import Header from '../../Components/Header/Header'
import { IoIosArrowBack } from 'react-icons/io'
import { LuWalletCards } from 'react-icons/lu'
import { PiCurrencyCircleDollar } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import DoughnutChart from '../../Components/DoughnutChart/DoughnutChart'
import Lable_User_Wealth from '../../Components/Lable_User_Wealth/Lable_User_Wealth'

export default function Home() {
  const values = [1000, 400, 700]
  const labels = ['گسترش فردای ایرانیان', 'گنجینه آینده روشن', 'تجربه ایرانیان']
  const colors = ['#b91c1c', '#059669', '#2563eb']

  return (
    <div className="Home w-auto min-h-screen flex-1">
      <Header />

      <div className="Main_content w-full min-h-screen mt-4">
        <div className="user_wealth card_style p-4">

          {/* تایتل بخش دارایی */}
          <div className="title_box_user_wealth text-gray-700 py-2 pb-6 flex justify-between items-center border-b-2 border-dashed border-gray-300">
            <div className="lable_user_wealth">
              <LuWalletCards className="inline-block text-2xl" />
              <span className="text-md mr-3">دارایی شما</span>
            </div>

            <button className="cursor-pointer">
              <span className="text-sm">سابقه درخواست‌ها</span>
              <IoIosArrowBack className="inline-block text-xl mr-1" />
            </button>
          </div>

          {/* نمایش دارایی کاربر بصورت نموداری و متنی */}
          <div className="grid grid-cols-12 mt-4 gap-y-12">

            {/* نمایش دارایی کاربر بصورت متنی */}
            <div className="md:col-span-6 col-span-12 md:order-1 order-2 px-3 space-y-2">
              <Lable_User_Wealth wealthText="دارایی کل" wealthAmount="1,000,000" first />
              <Lable_User_Wealth wealthText="دارایی در صندوق‌ها" wealthAmount="500,000" />
              <Lable_User_Wealth wealthText="مانده کیف پول کارگزاری" wealthAmount="250,000" />
              <Lable_User_Wealth wealthText="مانده قابل برداشت" wealthAmount="250,000" />

              {/* دکمه های سرمایه گذاری و برداشت */}
              <div className="grid grid-cols-6 gap-x-4 mt-4">

                <Link to="/" className="col-span-3 my-gradient-button transi font-bold w-full py-2 rounded-md flex justify-center items-center gap-x-2">

                  <PiCurrencyCircleDollar className="text-xl" />
                  <span className="text-white">سرمایه‌گذاری</span>
                </Link>

                <button className="col-span-3 border border-gray-800 text-gray-800 w-full py-2 rounded-md flex justify-center items-center gap-x-2">
                  <PiCurrencyCircleDollar className="text-xl" />
                  <span>برداشت وجه</span>
                </button>
              </div>
            </div>

            {/* نمایش دارایی کاربر در صندوق ها بصورت نموداری */}
            <div className="md:col-span-6 col-span-12 md:order-2 order-1 flex flex-row items-center justify-around gap-x-6 md:mt-0 mt-4">
              <div className="size-36">
                <DoughnutChart
                  values={values}
                  labels={labels}
                  colors={colors}
                  cutout="90%"
                  showLegend={false}
                />
              </div>

              <div className="flex flex-col justify-center items-start gap-y-8 text-sm text-gray-700">
                <div className="flex items-center gap-x-2">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: colors[0] }}></span>
                  <span>گسترش فردای ایرانیان – ۴۴.۶۷٪</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: colors[1] }}></span>
                  <span>گنجینه آینده‌ی روشن – ۱۲.۹۳٪</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: colors[2] }}></span>
                  <span>تجربه ایرانیان – ۴۲.۴۰٪</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
