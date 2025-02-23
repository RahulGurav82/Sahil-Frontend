import { useState } from "react";
import { api } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { RiComputerLine, RiRadarLine, RiCpuLine } from "react-icons/ri";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/user/login", credentials);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.error || "Login failed");
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
            <RiComputerLine className="w-12 h-12 text-blue-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center neon-text">
          NETWORK ACCESS
        </h2>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
            <div className="flex items-center">
              <RiCpuLine className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
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
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
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
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
          </div>

          <button type="submit" className="cyber-button w-full py-3 rounded flex items-center justify-center">
            <RiRadarLine className="w-5 h-5 mr-2" />
            INITIATE LOGIN
          </button>

          <div className="text-center mt-4">
            <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center">
              <RiCpuLine className="w-4 h-4 mr-1" />
              CREATE NEW ACCESS POINT
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
