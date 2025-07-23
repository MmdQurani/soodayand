// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('Token');
  if (!token) {
    // کاربر لاگین نکرده
    return <Navigate to="/auth" replace />;
  }
  // لاگین کرده، اجازه‌ی دسترسی میدیم
  return children;
}

export default ProtectedRoute;
