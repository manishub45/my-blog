import React from 'react'
import { Login as LoginComponent } from '../components'

export default function Login() {
  return (
    // add consistent background & height so footer stays at bottom
    <div className="py-12 bg-gray-50 min-h-[calc(100vh-80px)] flex items-center">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Log in to continue posting and exploring.
        </p>

        {/* actual login form component (logic unchanged) */}
        <LoginComponent />
      </div>
    </div>
  )
}
