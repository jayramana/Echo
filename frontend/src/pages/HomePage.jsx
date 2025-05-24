"use client"

import { useState, useCallback, useEffect } from "react"
import { useChatStore } from "../store/useChatStore"

import Sidebar from "../components/Sidebar"
import NoChatSelected from "../components/NoChatSelected"
import ChatContainer from "../components/ChatContainer"

const HomePage = () => {
  const { selectedUser } = useChatStore()
  const [sidebarWidth, setSidebarWidth] = useState(320) // Default width in pixels
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
        // Set minimum and maximum widths
        const minWidth = 250
        const maxWidth = 600

        if (newWidth >= minWidth && newWidth <= maxWidth) {
          setSidebarWidth(newWidth)
        }
      }
    },
    [isResizing],
  )

  // Add event listeners for mouse move and mouse up when resizing
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

      // Prevent text selection while dragging
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
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar with dynamic width */}
      <div style={{ width: `${sidebarWidth}px` }} className="flex-shrink-0 relative">
        <Sidebar />

        {/* Resize handle */}
        <div
          className={`absolute top-0 right-0 w-2 h-full cursor-col-resize bg-transparent hover:bg-[#1877F2]/20 transition-colors border-r-2 border-transparent hover:border-[#1877F2] ${
            isResizing ? "bg-[#1877F2]/30 border-[#1877F2]" : ""
          }`}
          onMouseDown={startResizing}
          style={{ zIndex: 10 }}
        >
          {/* Visual indicator for the resize handle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-12 bg-[#E4E6EA] rounded-sm opacity-60" />
        </div>
      </div>

      {/* Chat container takes remaining space */}
      <div className="flex-1 flex flex-col min-w-0">{!selectedUser ? <NoChatSelected /> : <ChatContainer />}</div>
    </div>
  )
}

export default HomePage
