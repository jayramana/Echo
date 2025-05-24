"use client"

import { useEffect, useState } from "react"
import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import { Search, Users, Settings, MoreHorizontal } from "lucide-react"
import SidebarSkeleton from "./skeletons/SidebarSkeleton"

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesOnlineFilter = showOnlineOnly ? onlineUsers.includes(user._id) : true
    return matchesSearch && matchesOnlineFilter
  })

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className="h-full flex flex-col bg-white border-r border-slate-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Messages</h1>
              <p className="text-xs text-slate-500">{filteredUsers.length} conversations</p>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200">
            <Settings className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder-slate-500 text-sm"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm font-medium text-slate-700">Show online only</span>
          <button
            onClick={() => setShowOnlineOnly(!showOnlineOnly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              showOnlineOnly ? "bg-blue-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                showOnlineOnly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {filteredUsers.map((user) => {
            const isOnline = onlineUsers.includes(user._id)
            const isSelected = selectedUser?._id === user._id

            return (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full p-4 flex items-center gap-4 rounded-xl transition-all duration-200 group relative ${
                  isSelected
                    ? "bg-blue-50 border border-blue-200 shadow-sm"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-slate-900 truncate text-sm">{user.name}</h3>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    {isOnline ? (
                      <>
                        <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                        Active now
                      </>
                    ) : (
                      "Offline"
                    )}
                  </p>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
                )}
              </button>
            )
          })}

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">{searchQuery ? "No users found" : "No online users"}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
