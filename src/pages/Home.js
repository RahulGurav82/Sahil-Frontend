import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiWifiOffLine, RiRadarLine, RiShieldLine, RiPulseLine, RiTerminalBoxLine } from "react-icons/ri";
import { FiPower } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();
  const [isJamming, setIsJamming] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [logs, setLogs] = useState([]);
  const [networks, setNetworks] = useState([
    { id: 1, name: "Network_01", strength: 85, security: "WPA2", channel: 6 },
    { id: 2, name: "Network_02", strength: 72, security: "WPA3", channel: 11 },
    { id: 3, name: "Network_03", strength: 65, security: "WEP", channel: 1 },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, { time: new Date().toLocaleTimeString(), message }]);
  };

  const handleStartJamming = () => {
    if (!selectedNetwork) {
      addLog("ERROR: No network selected");
      return;
    }
    setIsJamming(true);
    addLog(`INITIATING JAMMING SEQUENCE ON ${selectedNetwork.name}`);
    setTimeout(() => addLog("INJECTING DEAUTH PACKETS..."), 1000);
    setTimeout(() => addLog("CHANNEL INTERFERENCE ACTIVE"), 2000);
  };

  const handleStopJamming = () => {
    setIsJamming(false);
    addLog(`TERMINATING JAMMING SEQUENCE ON ${selectedNetwork.name}`);
    setTimeout(() => addLog("DEAUTH ATTACK STOPPED"), 1000);
    setTimeout(() => addLog("CHANNEL RESTORED"), 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-blue-400 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold neon-text flex items-center">
          <RiTerminalBoxLine className="mr-2" />
          NETWORK CONTROL CENTER
        </h1>
        <button
          onClick={handleLogout}
          className="cyber-button px-4 py-2 rounded flex items-center"
        >
          <FiPower className="mr-2" />
          DISCONNECT
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network List */}
        <div className="cyber-card p-6 rounded-lg col-span-1">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <RiRadarLine className="mr-2" />
            DETECTED NETWORKS
          </h2>
          <div className="space-y-4">
            {networks.map((network) => (
              <div
                key={network.id}
                onClick={() => {
                  setSelectedNetwork(network);
                  addLog(`SELECTED TARGET: ${network.name}`);
                }}
                className={`p-4 rounded cursor-pointer transition-all duration-200 ${
                  selectedNetwork?.id === network.id
                    ? "neon-border bg-blue-500/10"
                    : "border border-blue-400/30 hover:border-blue-400"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono">{network.name}</span>
                  <span className="text-xs">CH: {network.channel}</span>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="flex items-center">
                    <RiShieldLine className="mr-1" />
                    {network.security}
                  </span>
                  <span className="flex items-center">
                    <RiPulseLine className="mr-1" />
                    {network.strength}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Control Panel */}
        <div className="cyber-card p-6 rounded-lg col-span-1">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <RiWifiOffLine className="mr-2" />
            JAMMING CONTROLS
          </h2>
          <div className="space-y-4">
            <div className="p-4 border border-blue-400/30 rounded">
              <div className="font-mono mb-2">SELECTED TARGET:</div>
              {selectedNetwork ? (
                <div className="text-lg font-bold neon-text">
                  {selectedNetwork.name}
                </div>
              ) : (
                <div className="text-red-400">NO TARGET SELECTED</div>
              )}
            </div>
            <button
              onClick={isJamming ? handleStopJamming : handleStartJamming}
              disabled={!selectedNetwork}
              className={`cyber-button w-full py-4 rounded flex items-center justify-center ${
                isJamming ? "border-red-500 text-red-500" : ""
              } ${!selectedNetwork ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isJamming ? (
                <>
                  <RiWifiOffLine className="mr-2 animate-pulse" />
                  TERMINATE JAMMING
                </>
              ) : (
                <>
                  <RiWifiOffLine className="mr-2" />
                  INITIATE JAMMING
                </>
              )}
            </button>
          </div>
        </div>

        {/* Terminal Logs */}
        <div className="cyber-card p-6 rounded-lg col-span-1">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <RiTerminalBoxLine className="mr-2" />
            SYSTEM LOGS
          </h2>
          <div className="h-[400px] overflow-y-auto font-mono text-sm bg-black/50 p-4 rounded border border-blue-400/30">
            {logs.map((log, index) => (
              <div key={index} className="mb-2">
                <span className="text-green-400">[{log.time}]</span>{" "}
                <span className="text-blue-400">{log.message}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <div className="text-blue-400/50">NO LOGS AVAILABLE</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
