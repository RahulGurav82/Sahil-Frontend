import { useState } from "react";
import { api } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiUser, FiLock } from "react-icons/fi";
import { RiWifiLine, RiShieldKeyholeLine, RiCpuLine } from "react-icons/ri";

const Register = () => {
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/user/register", user);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center circuit-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
      </div>

      <div className="cyber-card p-8 rounded-lg w-96 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full neon-border">
            <RiWifiLine className="w-12 h-12 text-blue-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center neon-text">
          CREATE ACCESS
        </h2>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
            <div className="flex items-center">
              <RiCpuLine className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FiMail className="h-5 w-5 text-blue-400" />
              </div>
              <input
                type="email"
                required
                className="cyber-input w-full pl-10 pr-4 py-3 rounded bg-black/50"
                placeholder="ENTER EMAIL"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FiUser className="h-5 w-5 text-blue-400" />
              </div>
              <input
                type="text"
                required
                className="cyber-input w-full pl-10 pr-4 py-3 rounded bg-black/50"
                placeholder="ENTER USERNAME"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FiLock className="h-5 w-5 text-blue-400" />
              </div>
              <input
                type="password"
                required
                className="cyber-input w-full pl-10 pr-4 py-3 rounded bg-black/50"
                placeholder="ENTER PASSWORD"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="cyber-button w-full py-3 rounded flex items-center justify-center">
            <RiShieldKeyholeLine className="w-5 h-5 mr-2" />
            INITIALIZE ACCESS
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center">
              <RiCpuLine className="w-4 h-4 mr-1" />
              EXISTING ACCESS POINT
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
