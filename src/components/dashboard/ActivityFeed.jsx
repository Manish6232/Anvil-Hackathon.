import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ActivityFeed() {
  const [logs, setLogs] = useState([
    "SponsorHunter found NVIDIA partnership lead",
    "ProposalWriter generated fintech proposal",
    "OutreachAgent sent outreach email to Stripe",
  ]);

  const [input, setInput] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = [
        "AI matched sponsor with 94% confidence",
        "RecoveryAgent checkpoint saved",
        "Follow-up email scheduled",
        "CRM updated with sponsor response",
        "Proposal optimized for fintech vertical",
      ];

      setLogs((prev) => [
        newLogs[Math.floor(Math.random() * newLogs.length)],
        ...prev.slice(0, 5),
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCommand = () => {
    if (!input.trim()) return;

    setLogs((prev) => [
      `FundForge AI executed: ${input}`,
      ...prev,
    ]);

    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-10"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">
          AI Activity Stream
        </h2>

        <div className="flex items-center gap-2 text-green-400">
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
          LIVE
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/40 border border-white/5 rounded-2xl p-4 text-zinc-300"
          >
            {log}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask FundForge AI..."
          className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
        />

        <button
          onClick={handleCommand}
          className="px-6 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
        >
          Execute
        </button>
      </div>
    </motion.div>
  );
}