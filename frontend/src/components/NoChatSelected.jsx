import { MessageSquare } from "lucide-react"

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-white">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[#1877F2] flex items-center justify-center animate-bounce">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-[#1C1E21]">Welcome to Echo!</h2>
        <p className="text-[#65676B]">Select a conversation from the sidebar to start chatting</p>
      </div>
    </div>
  )
}

export default NoChatSelected
