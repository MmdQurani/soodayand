import React from 'react'
import { Link } from 'react-router-dom'

function Link_Item({children , text , href}) {
  return (
    <>
      <li className='pb-2 pr-6 border-b-1 border-gray-300 flex'>
        <Link to={href} className='w-full h-auto py-2'>
          {children}
          <span className='inline-block mr-2'>{text}</span>
        </Link>
      </li>
    </>
  )
}

export default Link_Item