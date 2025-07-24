import React from 'react'

function Login_Input({ lable, children }) {
  return (
    <div className="mb-5">
      <label htmlFor="nationalId" className="block text-gray-700 mb-2" dir="rtl">
        {lable}
      </label>
      <div className="relative">{children}</div>
    </div>
  );
}

export default Login_Input