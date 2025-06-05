import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { logoutUser } from "../utils/logout";

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.4 }}
  className="bg-blue-600 text-white w-64 min-h-screen p-6 space-y-4"
>

{user && (
        <div className="flex items-center h- w-56 bg-slate-700 rounded-lg space-x-4 mb-6">
          <img
            src={user.avatar || "https://external-preview.redd.it/w4OHuxBN_rhoieORy0LabFzJ4rB837GmYlqp1P2Q5h8.jpg?width=1080&crop=smart&auto=webp&s=0b2d4cc6d010324875132107fce69fc77ea6ad47"}
            alt="User Avatar"
            className="w-12 ml-2 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs">{user.email}</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6">Menu</h2>
      <ul className="space-y-3">
        <li>
          <Link
            to="/overview"
            className={`hover:text-blue-200 ${
              location.pathname === "/overview" && "text-blue-300 font-bold"
            }`}
          >
            📊 Overview
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className={`hover:text-blue-200 ${
              location.pathname === "/calendar" && "text-blue-300 font-bold"
            }`}
          >
            📅 Calendar
          </Link>
        </li>
        <li>
          <Link
            to="/tasks"
            className={`hover:text-blue-200 ${
              location.pathname === "/tasks" && "text-blue-300 font-bold"
            }`}
          >
            📋 Tasks
          </Link>
        </li>
        <li>
          <Link
            to="/assistant"
            className={`hover:text-blue-200 ${
              location.pathname === "/assistant" && "text-blue-300 font-bold"
            }`}
          >
            🤖 AI Assistant
          </Link>
        </li>
        <li>
        <NavLink to="/analytics" className="...">📊 Analytics</NavLink>
        </li>
      </ul>

       <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 md:hidden rounded w-full"
                      onClick={logoutUser}
                    >
                      Logout
                    </button>
      </motion.div>
  );
};

export default Sidebar;


21504545
251525622