// src/Pages/Home/Home.jsx
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { IoIosArrowBack } from 'react-icons/io'
import { LuWalletCards } from 'react-icons/lu'
import { PiCurrencyCircleDollar } from 'react-icons/pi'
import { Link } from 'react-router-dom'

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


  const values = [assetServiceData, tajrobeiranianData, gostareshFundData]
  const labels = ['گسترش فردای ایرانیان', 'تجربه ایرانیان', 'گنجینه آینده روشن']
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

        // مجموع دارایی‌ها را محاسبه می‌کنیم
        if (assetService.result && assetService.result.length > 0) {
          const sumEtf = assetService.result.reduce((acc, item) => acc + item.sum, 0) // فرض بر این است که هر آیتم دارای یک فیلد sum است
          setAssetServiceData(sumEtf) // ذخیره‌ی مجموع دارایی‌ها در state
        } else {
          setAssetServiceData(0)
        }

        // اگر tajrobeiranian.asset وجود داشته باشد، آن را به عنوان مجموع دارایی تجربه ایرانیان تنظیم می‌کنیم
        if (tajrobeiranian.asset) {
          const sumTajrobeiranian = tajrobeiranian.asset // فرض بر این است که tajrobeiranian.asset یک عدد است
          setTajrobeiranianData(sumTajrobeiranian)
        } else {
          setTajrobeiranianData(0)
        }

        // اگر gostareshFund.asset وجود داشته باشد، آن را به عنوان مجموع دارایی گسترش فردای ایرانیان تنظیم می‌کنیم
        if (gostareshFund.asset) {
          const sumGostareshFund = gostareshFund.asset // فرض بر این است که gostareshFund.asset یک عدد است
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
      setFinancialRemain(0)
      setPurchaseUpperBound(0)
    }
  }, [upperBound])

  // ۴. محاسبه‌ی دارایی کل بر اساس داده‌های دارایی
  useEffect(() => {
    const total = assetServiceData + tajrobeiranianData + gostareshFundData // محاسبه‌ی مجموع دارایی‌ها
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

      </div>
    </div>
  )
}
