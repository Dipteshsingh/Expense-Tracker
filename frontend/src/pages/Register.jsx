import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
        "http://localhost:4000/api/auth/register",
        formData
      );

      setMessage(res.data.message);
      navigate("/dashboard");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl">
      <div className="mb-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/30">
          <Wallet size={26} className="text-white" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-white">
          Create Account
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Sign up to manage your finance tracker account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="John"
              className="w-full rounded-2xl bg-gray-800 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:bg-gray-850"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Doe"
              className="w-full rounded-2xl bg-gray-800 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:bg-gray-850"
            />
          </div>
        </div>

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
            className="w-full rounded-2xl bg-gray-800 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:bg-gray-850"
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
            className="w-full rounded-2xl bg-gray-800 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:bg-gray-850"
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
          className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-3.5 text-sm font-semibold text-white transition shadow-lg shadow-indigo-900/30"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-400 hover:text-indigo-300 transition"
        >
          Log in
        </Link>
      </p>
    </div>
  </div>
);
};

export default Register;