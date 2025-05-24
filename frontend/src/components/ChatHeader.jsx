"use client"

import { useState, useRef, useEffect } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore"
import { MoreVertical, ArrowLeft, Search, Paperclip, Archive, Trash2, UserX, Flag } from "lucide-react"

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const isOnline = onlineUsers.includes(selectedUser._id)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const dropdownOptions = [
    { icon: Search, label: "Search in conversation", action: () => console.log("Search") },
    { icon: Paperclip, label: "View attachments", action: () => console.log("View attachments") },
    { icon: Archive, label: "Archive conversation", action: () => console.log("Archive") },
    { icon: UserX, label: "Block user", action: () => console.log("Block user") },
    { icon: Flag, label: "Report conversation", action: () => console.log("Report") },
    { icon: Trash2, label: "Delete conversation", action: () => console.log("Delete"), danger: true },
  ]

  return (
    <div className="relative p-6 border-b border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="flex items-center justify-between">
        {/* Left Section - User Info */}
        <div className="flex items-center gap-4">
          {/* Back Button (Mobile) */}
          <button
            onClick={() => setSelectedUser(null)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>

          {/* Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            {isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
            )}
          </div>

          {/* User Details */}
          <div>
            <h3 className="font-semibold text-slate-900 text-lg">{selectedUser.name}</h3>
            <p className="text-sm flex items-center gap-2">
              {isOnline ? (
                <>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-emerald-600 font-medium">Active now</span>
                </>
              ) : (
                <span className="text-slate-500">Offline</span>
              )}
            </p>
          </div>
        </div>

        {/* Right Section - Menu Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-3 hover:bg-slate-100 rounded-xl transition-all duration-200 hover:scale-105 group"
          >
            <MoreVertical className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
          </button>

          {/* Dropdown Menu - Fixed z-index with proper positioning */}
          {showDropdown && (
            <div className="fixed right-6 top-20 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-[99999] animate-in slide-in-from-top-2 duration-200">
              {dropdownOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    option.action()
                    setShowDropdown(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors duration-200 ${
                    option.danger ? "text-red-600 hover:bg-red-50" : "text-slate-700"
                  }`}
                >
                  <option.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
