import React from 'react'
import { Link } from 'react-router-dom'

function Advertising_Banner_Item({href , src}) {
  return (
    <>
      <Link to={href} className='w-full h-full flex justify-center items-center px-2'>
        <img src={src} className='object-contain rounded-lg w-full' alt="بنر" />
      </Link>
    </>
  )
}

export default Advertising_Banner_Item