"use client"

import { useChatStore } from "../store/useChatStore"
import { useEffect, useRef } from "react"
import { Reply, Forward } from "lucide-react"

import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import MessageSkeleton from "./skeletons/MessageSkeleton"
import { useAuthStore } from "../store/useAuthStore"
import { formatMessageTime } from "../lib/utils"

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } =
    useChatStore()
  const { authUser } = useAuthStore()
  const messageEndRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessages()
    return () => unsubscribeFromMessages()
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleReply = (messageId) => {
    console.log("Reply to message:", messageId)
  }

  const handleForward = (messageId) => {
    console.log("Forward message:", messageId)
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-b from-slate-50 to-white">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-b from-slate-50 to-white">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => {
            const isOwnMessage = message.senderId === authUser._id

            return (
              <div
                key={message._id}
                className={`group flex items-end gap-3 ${isOwnMessage ? "justify-end" : "justify-start"}`}
                ref={index === messages.length - 1 ? messageEndRef : null}
              >
                {/* Received message: Avatar on left */}
                {!isOwnMessage && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                      <img
                        src={selectedUser.profilePic || "/placeholder.svg?height=32&width=32"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Message bubble container */}
                <div className="relative max-w-[70%]">
                  {/* Hover action buttons */}
                  <div
                    className={`absolute top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1 z-10 ${
                      isOwnMessage ? "-left-16" : "-right-16"
                    }`}
                  >
                    <button
                      onClick={() => handleReply(message._id)}
                      className="p-2 bg-white text-slate-600 rounded-full shadow-lg hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 hover:scale-105"
                      title="Reply"
                    >
                      <Reply className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleForward(message._id)}
                      className="p-2 bg-white text-slate-600 rounded-full shadow-lg hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 hover:scale-105"
                      title="Forward"
                    >
                      <Forward className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Message bubble */}
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm transition-all duration-200 group-hover:shadow-md ${
                      isOwnMessage
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                        : "bg-white border border-slate-200 text-slate-900"
                    }`}
                  >
                    {/* Message image */}
                    {message.image && (
                      <div className="mb-2">
                        <img
                          src={message.image || "/placeholder.svg?height=200&width=300"}
                          alt="Attachment"
                          className="max-w-[280px] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                          onClick={() => window.open(message.image, "_blank")}
                        />
                      </div>
                    )}

                    {/* Message text */}
                    {message.text && <p className="text-sm leading-relaxed break-words">{message.text}</p>}
                  </div>

                  {/* Timestamp */}
                  <div className={`mt-1 ${isOwnMessage ? "text-right" : "text-left"}`}>
                    <span className="text-xs text-slate-500">{formatMessageTime(message.createdAt)}</span>
                  </div>
                </div>

                {/* Own message: Avatar on right */}
                {isOwnMessage && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                      <img
                        src={authUser.profilePic || "/placeholder.svg?height=32&width=32"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
