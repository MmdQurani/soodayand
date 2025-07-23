// src/routes/RoutesValue.jsx
import Auth from "../Pages/LoginPage/LoginPage";
import Home from "../Pages/Home/Home";
import ProtectedRoute from "../Components/ProtectedRoute";

const RoutesValue = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '*',
    element: <div>صفحه یافت نشد</div>
  }
];

export default RoutesValue;
