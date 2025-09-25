import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {

    const[loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const logoutHandler = async()=>{
      try {
        setLoading(true)
        await authService.logout() // Appwrite session delete
        dispatch(logout())        // Redux state clear

      } catch (error) {
        console.error("Logout failed:", error);
      } 
      finally{
        setLoading(false)
      }
    }

  return (
    <button
  onClick={logoutHandler}
  disabled={loading}
  className={`px-5 py-2 rounded-full font-medium transition 
    ${loading 
      ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
      : "bg-red-500 text-white hover:bg-red-600"}`}
>
  {loading ? "Logging out..." : "Logout"}
</button>

  )
}

export default LogoutBtn
