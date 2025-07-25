import React, { createContext, useState, useEffect } from 'react'
import { fetchCustomerInfo } from '../APIs/api/assetService'

// ۱. تعریف Context
export const CustomerContext = createContext()

// ۲. ساخت Provider کامپوننت
export function CustomerProvider({ children }) {
  const [customerInfo, setCustomerInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCustomer = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchCustomerInfo()
        setCustomerInfo(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadCustomer()
  }, [])

  // ۳. مقدارهای ارائه‌شده به کل درخت
  return (
    <CustomerContext.Provider
      value={{ customerInfo, loading, error }}
    >
      {children}
    </CustomerContext.Provider>
  )
}
