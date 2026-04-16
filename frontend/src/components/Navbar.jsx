import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wallet, LayoutDashboard, History, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
  <nav className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-xl border-b border-gray-800 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-900/30">
          <Wallet size={22} />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Finance Tracker
          </h1>
          <p className="text-xs text-gray-500 -mt-0.5">
            Manage your money smarter
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <Link
          to="/dashboard"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
            isActive("/dashboard")
              ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-900/30"
              : "bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/history"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
            isActive("/history")
              ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-900/30"
              : "bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <History size={18} />
          History
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-rose-900/20"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  </nav>
);
};

export default Navbar;