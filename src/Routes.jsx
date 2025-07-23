// src/routes/RoutesValue.jsx

import Auth from "../Pages/LoginPage/LoginPage"
import Home from "../Pages/Home/Home"

const RoutesValue = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '*',
    element: <div>صفحه یافت نشد</div>
  }
]

export default RoutesValue
