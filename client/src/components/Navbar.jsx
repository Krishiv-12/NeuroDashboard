import { useContext, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { logoutUser } from "../utils/logout";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = ({ onMenuClick }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      className={`flex justify-between items-center px-4 py-3 md:px-8 drop-shadow-2xl border-b-2 border-gray-400
        ${theme === "dark" ? "bg-slate-900 text-white" : "text-gray-800"}`}
    >
      <h1 className="text-3xl font-bold text-blue-600 dark:text-white">NeuroDash</h1>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <Menu className="w-6 h-6 cursor-pointer" onClick={onMenuClick} />
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
        {user && (
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
            onClick={logoutUser}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;