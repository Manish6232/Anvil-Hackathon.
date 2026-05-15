import { motion } from "framer-motion";

const traces = [
  {
    agent: "SponsorHunter",
    action: "Scanning sponsor database",
    status: "success",
    time: "18:42:01",
  },
  {
    agent: "FitScorer",
    action: "Calculated Stripe match score: 92%",
    status: "success",
    time: "18:42:04",
  },
  {
    agent: "ProposalWriter",
    action: "Generated personalized proposal draft",
    status: "running",
    time: "18:42:09",
  },
  {
    agent: "OutreachAgent",
    action: "Queued email follow-up sequence",
    status: "pending",
    time: "18:42:14",
  },
  {
    agent: "RecoveryAgent",
    action: "Checkpoint saved for workflow recovery",
    status: "success",
    time: "18:42:18",
  },
];

export default function Traces() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="mb-12">
        <h1 className="text-5xl font-black">Agent Execution Traces</h1>
        <p className="text-zinc-500 mt-4">
          Observability layer for autonomous fundraising workflows.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Live Workflow Timeline</h2>

          <div className="flex items-center gap-2 text-green-400">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            LIVE TRACE
          </div>
        </div>

        <div className="space-y-5">
          {traces.map((trace, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="flex items-start gap-5 bg-black/40 border border-white/10 rounded-2xl p-5"
            >
              <div className="text-sm text-zinc-500 w-20">{trace.time}</div>

              <div className="flex-1">
                <h3 className="font-bold text-cyan-400">{trace.agent}</h3>
                <p className="text-zinc-300 mt-1">{trace.action}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  trace.status === "success"
                    ? "bg-green-500/20 text-green-400"
                    : trace.status === "running"
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {trace.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}