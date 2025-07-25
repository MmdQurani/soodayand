import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../../public/images/Funds/Ayandeh-BKayWPzA.png'

function Fund_Card({href , src , label , fundType}) {
  return (
    <>
      <Link to={href} className='Fund_Card card_style w-full min-h-46 max-h-max p-3 flex flex-col items-center justify-around'>
        <div className='head_Fund_Card w-full flex flex-row justify-between'>
          <div className='flex-1 flex flex-col gap-y-2'>
            <span className='text-md text-gray-600'>صندوق</span>
            <span className='font-bold text-md text-gray-800'>{label}</span>
            <span className='text-xs bg-imageBg/60 text-gray-800 w-max px-4 py-1 rounded-md'>{fundType}</span>
          </div>
          <div className='w-24 flex justify-center items-center'>
            <img className='w-full object-contain' src={src} alt="صندوق ها" />
          </div>
        </div>

        <div className='body_Fund_Card w-full h-auto flex justify-between items-center pl-2'>
          <span className='text-sm text-gray-600'>عملکرد سالانه</span>
          <span className='text-sm text-gray-600'>30%</span>
        </div>
      </Link>
    </>
  )
}

export default Fund_Card