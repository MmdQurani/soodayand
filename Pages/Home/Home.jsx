import React from 'react'
import Header from '../../Components/Header/Header'
import { IoIosArrowBack } from "react-icons/io";
import { LuWalletCards } from "react-icons/lu";

function Home() {
  return (
    <div className="Home w-auto min-h-screen flex-1">

      <Header />

      <div className='Main_content w-full min-h-screen max-h-full mt-4'>

        <div className='user_wealth card_style p-4'>

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

        </div>

      </div>

    </div>
  )
}

export default Home
