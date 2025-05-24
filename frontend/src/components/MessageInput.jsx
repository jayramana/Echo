"use client"

import { useRef, useState } from "react"
import { useChatStore } from "../store/useChatStore"
import { ImageIcon, Send, X, Smile, Paperclip, Mic } from "lucide-react"
import toast from "react-hot-toast"

const MessageInput = () => {
  const [text, setText] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)
  const { sendMessage } = useChatStore()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!text.trim() && !imagePreview) return

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      })

      setText("")
      setImagePreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      toast.error("Failed to send message")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"
    }
  }

  return (
    <div className="p-6 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={imagePreview || "/placeholder.svg?height=80&width=80"}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-xl shadow-sm"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 shadow-lg"
                  type="button"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Image ready to send</p>
                <p className="text-xs text-slate-500">Click the X to remove</p>
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="flex items-end gap-3">
          {/* Main Input Container */}
          <div className="flex-1 relative">
            <div className="flex items-end gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
              {/* Attachment Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-white rounded-xl transition-all duration-200 hover:scale-105 group"
              >
                <Paperclip className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
              </button>

              {/* Text Input */}
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                  adjustTextareaHeight()
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-slate-900 placeholder-slate-500 resize-none focus:outline-none text-sm leading-relaxed min-h-[24px] max-h-[120px]"
                rows={1}
              />

              {/* Emoji Button */}
              <button
                type="button"
                className="p-2 hover:bg-white rounded-xl transition-all duration-200 hover:scale-105 group"
              >
                <Smile className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
              </button>

              {/* Image Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 group ${
                  imagePreview ? "bg-blue-100 text-blue-600" : "hover:bg-white"
                }`}
              >
                <ImageIcon
                  className={`w-5 h-5 ${imagePreview ? "text-blue-600" : "text-slate-600 group-hover:text-slate-900"}`}
                />
              </button>
            </div>

            {/* Hidden File Input */}
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
          </div>

          {/* Send/Voice Button */}
          {text.trim() || imagePreview ? (
            <button
              type="submit"
              className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!text.trim() && !imagePreview}
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              className={`p-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-slate-200 hover:bg-slate-300 text-slate-600"
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default MessageInput
