import React from 'react'
import { Link } from 'react-router-dom'

export default function QuickBarItem({ to = '/', icon: Icon, label = '' }) {

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center py-2 transition-colors'}`}>
        <Icon className='text-xl' />
        <span className='mr-2 text-md'>{label}</span>
      </Link>
    </li>
  )
}
