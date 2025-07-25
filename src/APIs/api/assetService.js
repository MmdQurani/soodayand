// src/api/assetService.js
import api from './api'
import { Date_Day_Value } from '../../../Components/Date_Day/Date_Day'

export const fetchPurchaseUpperBound = async () => {
  const response = await api.get('/Asset/PurchaseUpperBound')
  return response.data
}

export const fetchAssetService = async () => {
  const endDate = Date_Day_Value()

  const response = await api.get(`/Asset/EtfAssetDetail?endDate=${endDate}`)
  return response.data
}

export const fetchTajrobeiranian = async () => {
  const endDate = Date_Day_Value()

  const response = await api.get(`/Asset/CustomerRemains?fundCode=10885&endDate=${endDate}`)
  return response.data
}

export const fetchGostareshfundhttps = async () => {
  const endDate = Date_Day_Value()

  const response = await api.get(`/Asset/CustomerRemains?fundCode=10915&endDate=${endDate}`)
  return response.data
}

export const fetchCustomerInfo = async () => {

  const response = await api.get(`/UserManagement/CustomerInfo?fundCode=10915`)
  return response.data
}