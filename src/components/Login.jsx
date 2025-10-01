import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData));
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center w-full py-8 bg-gray-50">
      <div className="mx-auto w-full max-w-md bg-white rounded-xl p-8 md:p-10 border border-black/10 shadow-lg">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-semibold leading-tight text-gray-900">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="text-red-600 mt-6 text-center text-sm" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="space-y-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: true,
                
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...register("password", { required: true })}
            />

            <div className="pt-2">
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
