import React from 'react'

function Lable_User_Wealth({ wealthText, wealthAmount }) {
  return (
    <div className='flex flex-row justify-between items-center font-normal text-gray-700 text-sm py-4'>
      <span>{wealthText}</span>
      <span>{wealthAmount} (ریال)</span>
    </div>
  )
}

export default Lable_User_Wealth