// src/App.jsx
import React from 'react'
import { useRoutes } from 'react-router-dom'
import RoutesValue from './Routes'

export default function App() {
  const element = useRoutes(RoutesValue)

  return (
    <main className='py-4'>
      {element}
    </main>
  )
}
