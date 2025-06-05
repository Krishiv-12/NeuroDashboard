import { useState } from "react";
import { toast } from "react-hot-toast";

const AuthForm = ({ title, onSubmit, loading }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl shadow-xl">
      <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">{title === "Login" ? "Welcome Back!" : "Create an Account"}</h2>
      <p className="text-center text-gray-500 mb-6 text-sm">
        {title === "Login" ? "We missed you! Please enter your details." : "Please fill the details to register."}
      </p>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.email || !form.password || (title === "Register" && !form.name)) {
            return toast.error("Please fill all fields");
          }
          onSubmit(form);
        }}
      >
        {title === "Register" && (
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <div className="flex items-center justify-between text-sm text-gray-600">
          {title === "Login" && (
            <>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
          disabled={loading}
        >
          {loading ? "Loading..." : title}
        </button>

      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        {title === "Login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <a href={title === "Login" ? "/register" : "/login"} className="text-blue-600 font-medium hover:underline">
          {title === "Login" ? "Sign up" : "Login"}
        </a>
      </p>
    </div>
  );
};

export default AuthForm;
