import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [dispatch])

  return !loading ? (
    <div className="min-h-screen flex flex-col justify-between bg-white text-zinc-900">
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen text-lg font-medium">
      Loading...
    </div>
  )
}

export default App
