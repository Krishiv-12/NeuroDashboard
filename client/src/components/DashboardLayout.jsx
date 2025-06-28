import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex w-full min-h-screen bg-gray-100">

      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Toggle (optional) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar with toggle for mobile */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Main content */}
         <main
      className={`flex-1 p-4 ${
        theme === "dark"
          ? "bg-slate-900"
          : "bg-gradient-to-br from-purple-100 to-[#6A84ED]"
      }`}
    >
      {children}
    </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
