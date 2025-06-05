import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AuthForm from "../components/AuthForm";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (form) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      toast.success("Login successful!");
  
      // Save user data and token in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Save user details
  
      // Redirect to dashboard
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-500">
      <AuthForm title="Login" onSubmit={handleLogin} loading={loading} />
    </div>
  );
};

export default Login;
