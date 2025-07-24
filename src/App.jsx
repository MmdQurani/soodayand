// src/App.jsx
import React from 'react'
import { useRoutes } from 'react-router-dom'
import RoutesValue from './Routes'
import Side_Bar from '../Components/Side_Bar/Side_Bar'
import Quick_Bar from '../Components/Quick_Bar/Quick_Bar'

export default function App() {
  const element = useRoutes(RoutesValue)

  return (
    <div className='flex flex-row mx-auto w-[98%] 2xl:container gap-x-2 py-4' dir='rtl'>
      {/* سایدبار */}
      <Side_Bar />

      <main className=' flex-1'>
        {element}
      </main>

      <Quick_Bar />
    </div>
  )
}
