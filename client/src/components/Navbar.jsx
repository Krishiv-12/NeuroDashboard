import { useContext, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { logoutUser } from "../utils/logout";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = ({ onMenuClick }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`${theme === "dark" ? "dark:bg-slate-900" : "bg-gradient-to-t from-purple-100 to-slate-400"} shadow-2xl px-4 py-3 flex justify-between items-center md:px-8 border-b-2 border-gray-400`}>
      {/* Logo */}
      <h1 className="text-3xl font-bold text-blue-600 dark:text-white">NeuroDash</h1>


      <div className="md:hidden">
        <Menu className="w-6 h-6 dark:text-white" onClick={onMenuClick} />
      </div>

      {/* Hamburger Icon - Mobile Only */}
      {/* <div className="md:hidden">
        {isMenuOpen ? (
          <X className="w-6 h-6" onClick={() => setIsMenuOpen(false)} />
        ) : (
          <Menu className="w-6 h-6" onClick={() => setIsMenuOpen(true)} />
        )}
      </div> */}

      {/* Desktop Nav Content */}
      <div className="hidden md:flex items-center space-x-4">
      <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
        {user && (
          <>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              onClick={logoutUser}
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 flex flex-col items-start p-4 space-y-3 md:hidden">
          <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded w-full"
                onClick={logoutUser}
              >
                Logout
              </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
