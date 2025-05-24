"use client"

import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore"
import { EllipsisVertical } from "lucide-react"

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()

  return (
    <div className="p-4 border-b border-[#E4E6EA] bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="rounded-full w-10 h-10 overflow-hidden">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-[#1C1E21]">{selectedUser.name}</h3>
            <p className="text-sm text-[#65676B]">
              {onlineUsers.includes(selectedUser._id) ? (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#00D856] rounded-full"></span>
                  Active now
                </span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        {/* Menu button */}
        <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-[#F0F2F5] rounded-full transition-colors">
          <EllipsisVertical className="w-5 h-5 text-[#65676B]" />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
