"use client"

import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { LogOut, MessageSquare, Settings, User } from "lucide-react"

const Navbar = () => {
  const { logout, authUser } = useAuthStore()

  return (
    <header className="bg-[#1877F2] text-white shadow-md">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-4 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h1 className="text-lg font-bold">Echo</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={"/settings"}
              className="flex items-center gap-2 transition-colors hover:bg-[#166FE5] p-2 rounded-lg"
            >
              <Settings className="w-4 h-4 mt-1" />
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="flex items-center gap-2 hover:bg-[#166FE5] p-2 rounded-lg transition-colors"
                >
                  <User className="size-5" />
                </Link>

                <button
                  className="flex gap-2 items-center hover:bg-[#166FE5] p-2 rounded-lg transition-colors"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
