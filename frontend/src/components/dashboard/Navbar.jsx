"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

import { logoutUser } from "../../app/redux/actions/auth.actions.js";

export default function Navbar() {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {

    await dispatch(logoutUser());

    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    router.push("/login");
  };

  return (
    <div className="border-b bg-white p-4">

      <div className="max-w-5xl mx-auto flex justify-between items-center">

        {/* App Title */}
        <h1 className="text-xl font-semibold">
          📚 Book Manager
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <p className="text-muted-foreground">
            Hello <span className="font-medium">{user?.name}</span>
          </p>

          {/* Logout Icon */}
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-red-500 transition"
            title="Logout"
          >
            <LogOut size={20} />
          </button>

        </div>

      </div>

    </div>
  );
}