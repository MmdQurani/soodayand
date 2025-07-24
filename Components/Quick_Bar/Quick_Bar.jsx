import React from 'react'
import QuickBarItem from '../QuickBarItem/QuickBarItem'
import { SlHome } from 'react-icons/sl'
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HiOutlineUserCircle } from 'react-icons/hi'
import { LuMessageCircleMore } from 'react-icons/lu'

function Quick_Bar() {

  return (
    <>

      {/* Quick_Bar */}
      <div className='Quick_Bar fixed bottom-4 inset-x-0 min-w-[90%] max-w-[90%] mx-auto bg-Brown shadow-lg px-4 py-3 lg:hidden flex text-white rounded-xl'>
        <ul className='w-full flex flex-row justify-around items-center'>
          <QuickBarItem to='/' label='داشبورد' icon={SlHome} />
          <QuickBarItem to='/' icon={RiMoneyDollarCircleLine} />
          <QuickBarItem to='/' icon={HiOutlineUserCircle} />
          <QuickBarItem to='/' icon={LuMessageCircleMore} />
        </ul>
      </div>

    </>
  )
}

export default Quick_Bar