"use client"

import { useState, useCallback, useEffect } from "react"
import { useChatStore } from "../store/useChatStore"

import Sidebar from "../components/Sidebar"
import NoChatSelected from "../components/NoChatSelected"
import ChatContainer from "../components/ChatContainer"

const HomePage = () => {
  const { selectedUser } = useChatStore()
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isResizing, setIsResizing] = useState(false)

  const startResizing = useCallback((mouseDownEvent) => {
    mouseDownEvent.preventDefault()
    setIsResizing(true)
  }, [])

  const stopResizing = useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        const newWidth = mouseMoveEvent.clientX
        const minWidth = 280
        const maxWidth = 500

        if (newWidth >= minWidth && newWidth <= maxWidth) {
          setSidebarWidth(newWidth)
        }
      }
    },
    [isResizing],
  )

  useEffect(() => {
    if (isResizing) {
      const handleMouseMove = (e) => {
        e.preventDefault()
        resize(e)
      }
      const handleMouseUp = (e) => {
        e.preventDefault()
        stopResizing()
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      document.body.style.userSelect = "none"
      document.body.style.cursor = "col-resize"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.userSelect = ""
        document.body.style.cursor = ""
      }
    }
  }, [isResizing, resize, stopResizing])

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Sidebar with dynamic width */}
      <div
        style={{ width: `${sidebarWidth}px` }}
        className="flex-shrink-0 relative bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-xl shadow-slate-900/5"
      >
        <Sidebar />

        {/* Elegant Resize Handle */}
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize transition-all duration-300 ${
            isResizing
              ? "bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 shadow-lg shadow-amber-500/25"
              : "bg-transparent hover:bg-gradient-to-b hover:from-slate-300 hover:via-slate-400 hover:to-slate-500"
          }`}
          onMouseDown={startResizing}
          style={{ zIndex: 10 }}
        >
          {/* Sophisticated Visual Indicator */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              isResizing
                ? "w-1 h-16 bg-gradient-to-b from-amber-300 to-amber-500 rounded-full shadow-lg"
                : "w-0.5 h-12 bg-slate-300 rounded-full opacity-0 hover:opacity-100"
            }`}
          />
        </div>
      </div>

      {/* Chat container with elegant styling */}
      <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-b from-white via-slate-50/50 to-blue-50/30">
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  )
}

export default HomePage
