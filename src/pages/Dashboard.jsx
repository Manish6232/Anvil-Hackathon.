import { motion } from "framer-motion";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import { useEffect, useState } from "react";
import NeuralNetwork from "../components/three/NeuralNetwork";

export default function Dashboard() {
  const [funding, setFunding] = useState(248000);
  const [notification, setNotification] = useState(
    "New sponsor discovered: NVIDIA"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFunding((prev) => prev + Math.floor(Math.random() * 500));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <motion.div
        key={notification}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 right-6 z-50 bg-white/10 border border-cyan-500/30 backdrop-blur-xl rounded-2xl px-5 py-4 text-sm text-zinc-200"
      >
        🔔 {notification}
      </motion.div>

      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-black">AI Command Center</h1>
          <p className="text-zinc-500 mt-3">
            Autonomous fundraising agents are active.
          </p>
        </div>

        <button
          onClick={() => {
            setNotification("Campaign launched: AI agents are now fundraising");
            setFunding((prev) => prev + 5000);
          }}
          className="px-6 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all"
        >
          Launch Campaign
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6"
        >
          <p className="text-zinc-500">Funding Raised</p>
          <h2 className="text-4xl font-black mt-3 text-cyan-400">
            ${funding.toLocaleString()}
          </h2>
        </motion.div>

        <motion.div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-zinc-500">Active Agents</p>
          <h2 className="text-4xl font-black mt-3 text-purple-400">12</h2>
        </motion.div>

        <motion.div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-zinc-500">Sponsors Found</p>
          <h2 className="text-4xl font-black mt-3 text-pink-400">184</h2>
        </motion.div>

        <motion.div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-zinc-500">Success Rate</p>
          <h2 className="text-4xl font-black mt-3">92%</h2>
        </motion.div>
      </div>

      <div className="mt-10">
        <NeuralNetwork />
      </div>

      <div className="grid grid-cols-3 gap-6 mt-12">
        <motion.div className="bg-white/5 border border-cyan-500/20 rounded-3xl p-6">
          <h3 className="text-2xl font-bold">SponsorHunter</h3>
          <p className="text-zinc-500 mt-4">
            Discovering high-value sponsorship opportunities.
          </p>
        </motion.div>

        <motion.div className="bg-white/5 border border-purple-500/20 rounded-3xl p-6">
          <h3 className="text-2xl font-bold">ProposalWriter</h3>
          <p className="text-zinc-500 mt-4">
            Generating personalized proposals for sponsors.
          </p>
        </motion.div>

        <motion.div className="bg-white/5 border border-pink-500/20 rounded-3xl p-6">
          <h3 className="text-2xl font-bold">OutreachAgent</h3>
          <p className="text-zinc-500 mt-4">
            Sending outreach emails and tracking responses.
          </p>
        </motion.div>
      </div>

      <ActivityFeed />
    </div>
  );
}