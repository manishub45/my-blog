import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      // create account on Appwrite (signup)
      const userData = await authService.createAccount(data);

      // if account created, fetch current user and update redux
      if (userData) {
        const currentUserData = await authService.getCurrentUser();
        if (currentUserData) dispatch(authLogin(currentUserData));
        navigate("/");
      }
    } catch (err) {
      setError(err?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center w-full py-8 bg-gray-50">
      <div className="mx-auto w-full max-w-md bg-white rounded-xl p-8 md:p-10 border border-black/10 shadow-lg">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-semibold leading-tight text-gray-900">
          Create your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>

        {error && (
          <p className="text-red-600 mt-6 text-center text-sm" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-6">
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              autoComplete="email"
              {...register("email", { required: true })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              {...register("password", { required: true })}
            />

            <div className="pt-2">
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
