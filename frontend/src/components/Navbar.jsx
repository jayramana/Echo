import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-gray-100 text-[#25D366]"
    >
      <div className="container mx-auto px-4 h-16 ">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-4 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5  " />
              </div>
              <h1 className="text-lg font-bold ">Echo</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={"/settings"}
              className={`
               flex items-center gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4 mt-1 " />
              {/* <span className="hidden sm:inline ">Settings</span> */}
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`flex items-center gap-2`}>
                  <User className="size-5 " />
                  {/* <span className="hidden sm:inline">Profile</span> */}
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5 " />
                  {/* <span className="hidden sm:inline">Logout</span> */}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
