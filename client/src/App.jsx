import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Overview from "./pages/views/Overview";
import Calendar from "./pages/views/Calendar";
import Tasks from "./pages/views/Tasks";
import Assistant from "./pages/views/Assistant";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
        <Route path="/overview" element={<Overview />} />
        <Route path="/calendar" element={<Calendar
         />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
}

export default App;
