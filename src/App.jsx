// src/App.jsx
import React from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import RoutesValue from './Routes'
import Side_Bar from '../Components/Side_Bar/Side_Bar'
import Quick_Bar from '../Components/Quick_Bar/Quick_Bar'

export default function App() {
  const location = useLocation()
  const element = useRoutes(RoutesValue)

  // اگر در صفحه Auth باشیم
  const isAuthPage = location.pathname === '/auth'

  // در حالت Auth فقط یک پیام «سلام» نشان بده
  if (isAuthPage) {
    return (
      <main className="flex-1">
        {element}
      </main>
    )
  }

  // در سایر صفحات، لِی‌آوت عادی
  return (
    <div
      className="flex flex-row mx-auto w-[98%] 2xl:container gap-x-2 py-4"
      dir="rtl"
    >
      <Side_Bar />

      <main className="flex-1">
        {element}
      </main>

      <Quick_Bar />
    </div>
  )
}
