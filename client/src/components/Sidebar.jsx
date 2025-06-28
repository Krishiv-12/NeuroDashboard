import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { logoutUser } from "../utils/logout";

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const links = [
    { path: "/overview", label: "📊 Overview" },
    { path: "/calendar", label: "📅 Calendar" },
    { path: "/tasks", label: "📋 Tasks" },
    { path: "/assistant", label: "🤖 AI Assistant" },
    { path: "/analytics", label: "📈 Analytics" },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#6A84ED] text-white w-64 min-h-screen p-6 space-y-6"
    >
      {/* User Info */}
      {user && (
        <div className="flex items-center bg-slate-700 rounded-lg space-x-4 p-3">
          <img
            src={
              user.avatar ||
              "https://external-preview.redd.it/w4OHuxBN_rhoieORy0LabFzJ4rB837GmYlqp1P2Q5h8.jpg?auto=webp&s=e48b59100278a43bb318b6d35c0d3298e355cee0"
            }
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-gray-300">{user.email}</p>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav>
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block hover:text-blue-200 transition ${
                    isActive ? "text-blue-300 font-bold" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Logout */}
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
