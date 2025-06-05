import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AuthForm from "../components/AuthForm";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (form) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      toast.success("Registration successful! Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <AuthForm title="Register" onSubmit={handleRegister} loading={loading} />
    </div>
  );
};

export default Register;
