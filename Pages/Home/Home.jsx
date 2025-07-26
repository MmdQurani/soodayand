// src/Pages/Home/Home.jsx
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { IoIosArrowBack } from 'react-icons/io'
import { LuWalletCards } from 'react-icons/lu'
import { PiCurrencyCircleDollar } from 'react-icons/pi'
import { FiPhoneCall } from "react-icons/fi";
import { BiPlanet } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";

import { href, Link } from 'react-router-dom'

import DoughnutChart from '../../Components/DoughnutChart/DoughnutChart'
import Lable_User_Wealth from '../../Components/Lable_User_Wealth/Lable_User_Wealth'
import {
  fetchPurchaseUpperBound,
  fetchAssetService,
  fetchTajrobeiranian,
  fetchGostareshfundhttps,
} from '../../src/APIs/api/assetService'

import Banner1 from '../../src/assets/Banner/Banner1.webp'
import Banner2 from '../../src/assets/Banner/Banner2.webp'
import Advertising_Banner_Item from '../../Components/Advertising_Banner_Item/Advertising_Banner_Item'
import Fund_Card from '../../Components/Fund_Card/Fund_Card'

export default function Home() {

  // ۱. تعریف state برای ذخیره‌ی پاسخ API
  const [upperBound, setUpperBound] = useState(null) // ذخیره‌ی داده‌ی دریافتی از API
  const [assetServiceData, setAssetServiceData] = useState(0) // ذخیره‌ی داده‌ی دارایی
  const [tajrobeiranianData, setTajrobeiranianData] = useState(0) // ذخیره‌ی داده‌ی تجربه ایرانیان
  const [gostareshFundData, setGostareshFundData] = useState(0) // ذخیره‌ی داده‌ی گسترش فردای ایرانیان

  const [loading, setLoading] = useState(true) // وضعیت لود شدن
  const [error, setError] = useState(null) // وضعیت خطا


  const [totalFunds, setTotalFunds] = useState(0) // وضعیت دارایی صندوق ها
  const [totalPrice, setTotalPrice] = useState(0) // وضعیت قیمت کل

  const [financialRemain, setFinancialRemain] = useState(0) // وضعیت مانده مالی
  const [purchaseUpperBound, setPurchaseUpperBound] = useState(0) // وضعیت سقف خرید


  const values = [gostareshFundData, assetServiceData, tajrobeiranianData]
  const labels = ['گسترش فردای ایرانیان', 'گنجینه آینده روشن', 'تجربه ایرانیان']
  const colors = ['#b91c1c', '#059669', '#2563eb']


  // محاسبه درصد هر آیتم نسبت به totalFunds
  // اگر totalFunds صفر باشد، درصدها را به صورت پیش‌فرض تنظیم می‌کنیم
  // در غیر این صورت، درصدها را بر اساس مقادیر محاسبه می‌کنیم
  const percentages =
    totalFunds > 0
      ? values.map(v =>
        (v / totalFunds * 100).toLocaleString('fa-IR', {
          minimumFractionDigits: 2, // تنظیم حداقل رقم اعشار
          maximumFractionDigits: 2 // تنظیم حداکثر رقم اعشار
        })
      )
      : ['۰٫۰۰', '۰٫۰۰', '۰٫۰۰'] // درصدها را به صورت پیش‌فرض صفر تنظیم می‌کنیم



  useEffect(() => {

    // ۲. تابعی برای بارگذاری داده‌ها از API
    const loadUpperBound = async () => {
      setLoading(true)
      setError(null)

      // ۴. فراخوانی API و مدیریت پاسخ
      try {
        const upperBoundData = await fetchPurchaseUpperBound()
        const assetService = await fetchAssetService()
        const tajrobeiranian = await fetchTajrobeiranian()
        const gostareshFund = await fetchGostareshfundhttps()


        // console.log(upperBoundData)
        console.log(assetService)
        console.log(tajrobeiranian)
        console.log(gostareshFund)

        // مجموع دارایی‌ها را محاسبه می‌کنیم
        if (assetService.result && assetService.result.length > 0) {
          const sumEtf = assetService.result.reduce((acc, item) => acc + item.sum, 0) // فرض بر این است که هر آیتم دارای یک فیلد sum است
          setAssetServiceData(sumEtf) // ذخیره‌ی مجموع دارایی‌ها در state
        } else {
          setAssetServiceData(0)
        }

        // اگر tajrobeiranian.asset وجود داشته باشد، آن را به عنوان مجموع دارایی تجربه ایرانیان تنظیم می‌کنیم
        if (tajrobeiranian && tajrobeiranian.length > 0) {
          const sumTajrobeiranian = tajrobeiranian.map(item => item.asset) // فرض بر این است که tajrobeiranian.asset یک عدد است
          setTajrobeiranianData(sumTajrobeiranian)
        } else {
          setTajrobeiranianData(0)
        }

        // اگر gostareshFund.asset وجود داشته باشد، آن را به عنوان مجموع دارایی گسترش فردای ایرانیان تنظیم می‌کنیم
        if (gostareshFund && gostareshFund.length > 0) {
          const sumGostareshFund = gostareshFund.map(item => item.asset) // فرض بر این است که gostareshFund.asset یک عدد است
          setGostareshFundData(sumGostareshFund)
        } else {
          setGostareshFundData(0)
        }

        // ذخیره‌ی داده‌ها در state
        setUpperBound(upperBoundData)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadUpperBound()
  }, [])

  // ۳. استفاده از useEffect برای بارگذاری داده‌ها هنگام بارگذاری کامپوننت
  useEffect(() => {
    // اگر داده‌ی upperBound وجود داشته باشد، مقادیر مالی را تنظیم می‌کنیم
    if (upperBound) {
      setFinancialRemain(upperBound.financialRemain)
      setPurchaseUpperBound(upperBound.purchaseUpperBound)
    }
  }, [upperBound])

  // ۴. محاسبه‌ی دارایی کل بر اساس داده‌های دارایی
  useEffect(() => {
    const total = Number(assetServiceData) + Number(tajrobeiranianData) + Number(gostareshFundData) // محاسبه‌ی مجموع دارایی‌ها
    console.log(Number(assetServiceData), Number(tajrobeiranianData), Number(gostareshFundData))
    setTotalFunds(total)
  }, [assetServiceData, tajrobeiranianData, gostareshFundData])


  // ۵. محاسبه‌ی قیمت کل بر اساس مانده مالی و سقف خرید
  useEffect(() => {
    // اگر مانده مالی یا سقف خرید وجود نداشته باشد، قیمت کل را صفر تنظیم می‌کنیم
    if (financialRemain === null || purchaseUpperBound === null) {
      setTotalPrice(0)
    } else {
      const total = Number(financialRemain) + Number(totalFunds);
      setTotalPrice(total)
    }
  }, [totalFunds, financialRemain])

  const fundsList = [
    { id: 1, href: '/', lable: 'گسترش فردای ایرانیان', fundType: 'صدور و ابطالی', src: '../../public/images/Funds/Gostaresh-D896qJD1.png' },
    { id: 2, href: '/', lable: 'گنجینه آینده روشن', fundType: '(نماد صایند) ETF', src: '../../public/images/Funds/Ayandeh-BKayWPzA.png' },
    { id: 3, href: '/', lable: 'تجربه ایرانیان', fundType: 'صدور و ابطالی', src: '../../public/images/Funds/Tajrobe-DnZCvd33.png' },
  ]

  return (
    <div className="Home w-auto min-h-screen flex-1">
      <Header />
      <div className="Main_content w-full min-h-screen mt-4">

        {/* کارت نمایش دارایی کاربر در صندوق ها */}
        <div className="user_wealth card_style px-4 pt-4 pb-8">

          {/* عنوان بخش دارایی */}
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

          {/* وضعیت لود شدن یا خطا */}
          {loading && <p className="text-center py-4">در حال بارگذاری...</p>}
          {error && <p className="text-center text-red-600 py-4">خطا در دریافت اطلاعات</p>}

          {!loading && !error && upperBound && (
            <>
              <div className="grid grid-cols-12 mt-4 gap-y-12">
                {/* بخش متنی برجسته */}
                <div className="md:col-span-6 col-span-12 md:order-1 order-2 px-3 space-y-2">
                  <Lable_User_Wealth wealthText="دارایی کل" wealthAmount={totalPrice} first />
                  <Lable_User_Wealth wealthText="دارایی در صندوق‌ها" wealthAmount={totalFunds} />
                  <Lable_User_Wealth wealthText="مانده کیف پول کارگزاری" wealthAmount={financialRemain} />
                  <Lable_User_Wealth wealthText="مانده قابل برداشت" wealthAmount={purchaseUpperBound} />

                  <div className="grid grid-cols-6 gap-x-4 mt-4">
                    <Link to="/" className="col-span-3 my-gradient-button font-bold w-full py-2 rounded-md flex justify-center items-center gap-x-2">
                      <PiCurrencyCircleDollar className="text-xl" />
                      <span className="text-white">سرمایه‌گذاری</span>
                    </Link>
                    <button className="col-span-3 border border-gray-800 text-gray-800 w-full py-2 rounded-md flex justify-center items-center gap-x-2">
                      <PiCurrencyCircleDollar className="text-xl" />
                      <span>برداشت وجه</span>
                    </button>
                  </div>
                </div>

                {/* نمودار دایره‌ای */}
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

                    {/* درصد هر آیتم نسبت به totalFunds */}
                    {values.map((_, idx) => (
                      <div key={idx} className="flex items-center gap-x-2">
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: colors[idx] }}
                        />
                        <span>
                          {labels[idx]} – {percentages[idx]}٪
                        </span>
                      </div>
                    ))}

                  </div>

                </div>
              </div>
            </>
          )}
        </div>

        {/* بخش نمایش بنر های تبلیغاتی */}
        <div className='advertising_banner w-full h-auto grid grid-cols-12 gap-y-4 mt-4'>
          <div className='md:col-span-6 col-span-12'>
            <Advertising_Banner_Item href={'/'} src={Banner1} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <Advertising_Banner_Item href={'/'} src={Banner2} />
          </div>
        </div>

        {/* نمایش کارت صندوق های موجود در داشبورد */}
        <div className='Box_Funds w-full h-auto grid grid-cols-12 mt-4 gap-x-2'>

          {/* کارت مربوط به صندوق ها */}
          {fundsList.map(item =>
            <div key={item.id} className='2xl:col-span-3 md:col-span-6 col-span-12 py-2 px-1'>
              <Fund_Card to={item.href} src={item.src} label={item.lable} fundType={item.fundType} />
            </div>
          )}

          {/* کارت باشگاه مشتریان */}
          <div className='2xl:col-span-3 md:col-span-6 col-span-12 py-2 px-1'>
            <Link to={'/'} className='Fund_Card card_style w-full min-h-46 max-h-max p-3 flex flex-col items-center justify-around'>
              <div className='head_Fund_Card w-full flex flex-row justify-between items-center'>
                <div className='flex-1 flex flex-col gap-y-2'>
                  <span className='font-bold text-md text-gray-800'>کوآنتوم</span>
                  <span className='text-xs bg-imageBg/60 text-gray-800 w-max px-4 py-1 rounded-md'>باشگاه مشتریان</span>
                </div>
                <div className='w-24 flex justify-center items-center'>
                  <img className='w-full object-contain' src={'../../public/images/Funds/Clob-DmiE0y0H.png'} alt="صندوق ها" />
                </div>
              </div>

              <div className='body_Fund_Card w-full h-auto flex justify-between items-center pl-2'>
                <span className='text-sm text-gray-600'>بسته های پیشنهادی برای شما</span>
              </div>
            </Link>
          </div>

        </div>

        {/* لینک های ارتباطی */}
        <div className='w-full h-auto lg:flex hidden justify-end'>
          <div className='xl:w-4/5 w-full h-10 grid grid-cols-12 gap-x-8 pl-2 text-sm' dir='ltr'>
            <Link to={'/'} className='col-span-2 cursor-pointer text-gray-900 hover:text-imageBg bg-white  rounded-lg hover:shadow-md flex justify-center items-center'>
              <span className='flex flex-row items-center gap-x-2'>
                تلگرام
                <LiaTelegramPlane className='text-lg' />
              </span>
            </Link>
            <Link to={'/'} className='col-span-2 cursor-pointer text-gray-900 hover:text-imageBg bg-white  rounded-lg hover:shadow-md flex justify-center items-center'>
              <span className='flex flex-row items-center gap-x-2'>
                اینستاگرام
                <FaInstagram className='text-lg' />
              </span>
            </Link>
            <Link to={'/'} className='col-span-3 cursor-pointer text-gray-900 hover:text-imageBg bg-white  rounded-lg hover:shadow-md flex justify-center items-center'>
              <span className='flex flex-row items-center gap-x-2'>
                سـایت کارگزاری
                <BiPlanet className='text-lg' />
              </span>
            </Link>
            <Link to={'/'} className='col-span-5 cursor-pointer text-gray-900 hover:text-imageBg bg-white rounded-lg hover:shadow-md flex flex-row justify-between items-center px-2' dir='rtl'>
              <span className='flex flex-row items-center gap-x-2'>
                <FiPhoneCall className='text-md' />
                تماس با ما
              </span>
              <span >۰۲۱-۴۲۷۶۴۰۰۰</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
