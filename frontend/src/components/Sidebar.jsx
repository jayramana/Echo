"use client"

import { useEffect, useState } from "react"
import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import SidebarSkeleton from "./skeletons/SidebarSkeleton"

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()

  const { onlineUsers } = useAuthStore()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className="h-full flex flex-col bg-white border-r border-[#E4E6EA]">
      <div className="border-b border-[#E4E6EA] w-full p-4">
        <div>
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#F0F2F5] text-[#1C1E21] placeholder-[#65676B] border-none rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto w-full">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 transition-colors hover:bg-[#F0F2F5] ${
              selectedUser?._id === user._id ? "bg-[#E7F3FF]" : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-[#00D856] rounded-full ring-2 ring-white" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-[#1C1E21]">{user.name}</div>
              <div className="text-sm text-[#65676B]">{onlineUsers.includes(user._id) ? "Active now" : ""}</div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && <div className="text-center text-[#65676B] py-4">No online users</div>}
      </div>
    </aside>
  )
}

export default Sidebar
