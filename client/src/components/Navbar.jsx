import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";
import api from "../config/api";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      await api.post("/users/logout", {}, { withCredentials: true });
    } catch (error) {
      console.log("Logout error:", error);
    }

    dispatch(logout());
    toast.success("Logout successfully");
    navigate("/");
  };

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        <Link to={"/"}>
          <h1 className="text-3xl font-bold text-gray-900 flex items-end">
            Resumify
            <span className="relative inline-block w-3 h-3 bg-green-500 rounded-full ml-0.5 -translate-y-0.5"></span>
          </h1>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden">Hi, {user?.name}</p>
          <button
            onClick={logoutUser}
            className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
