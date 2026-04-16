import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Wallet } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const res = await axios.post(
      "https://expense-tracker-server4.onrender.com/api/auth/login",
      formData
    );

    login(res.data.user, res.data.token);

    setFormData({
      email: "",
      password: "",
    });

    navigate("/dashboard", { replace: true });
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-md rounded-3xl bg-gray-900 border border-gray-800 shadow-2xl p-8 md:p-10">
      <div className="mb-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/30">
          <Wallet className="text-white" size={26} />
        </div>

        <h2 className="text-3xl font-bold text-white tracking-tight">
          Login Account
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Login to manage your finance tracker account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder:text-gray-600 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full rounded-2xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder:text-gray-600 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {message && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm border ${
              message.toLowerCase().includes("wrong") ||
              message.toLowerCase().includes("error")
                ? "bg-rose-950/40 text-rose-300 border-rose-800"
                : "bg-emerald-950/40 text-emerald-300 border-emerald-800"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-500 px-4 py-3.5 text-sm font-semibold text-white transition-all duration-200 shadow-lg shadow-indigo-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Register
        </Link>
      </p>
    </div>
  </div>
);
};

export default Login;
