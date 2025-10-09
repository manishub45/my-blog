import React from 'react'
import { Signup as SignupComponent } from '../components'

export default function Signup() {
  return (
    // same clean centered card as Login page
    <div className="py-12 bg-gray-50 min-h-[calc(100vh-80px)] flex items-center">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2 text-center">
          Create Account
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Sign up to start creating and sharing your posts.
        </p>

        {/* Actual signup form component */}
        <SignupComponent />
      </div>
    </div>
  )
}
