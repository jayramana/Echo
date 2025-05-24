"use client"

import { useChatStore } from "../store/useChatStore"
import { useEffect, useRef } from "react"

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

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-white">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
            ref={messageEndRef}
          >
            <div
              className={`flex items-end gap-2 max-w-[70%] ${message.senderId === authUser._id ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className="size-8 rounded-full border overflow-hidden flex-shrink-0">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.senderId === authUser._id ? "bg-[#1877F2] text-white" : "bg-[#F0F2F5] text-[#1C1E21]"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image || "/placeholder.svg"}
                    alt="Attachment"
                    className="max-w-[200px] rounded-lg mb-2"
                  />
                )}
                {message.text && <p className="text-sm">{message.text}</p>}
                <div
                  className={`text-xs mt-1 ${message.senderId === authUser._id ? "text-blue-100" : "text-[#65676B]"}`}
                >
                  {formatMessageTime(message.createdAt)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
