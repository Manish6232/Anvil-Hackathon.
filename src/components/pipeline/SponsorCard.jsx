import { motion } from "framer-motion";
import { useState } from "react";

export default function SponsorCard({
  company,
  amount,
  status,
  confidence,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        onClick={() => setOpen(true)}
        className="bg-black/40 border border-white/10 rounded-2xl p-4 cursor-pointer hover:border-cyan-400/40 transition-all"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            {company}
          </h3>

          <span className="text-cyan-400 font-bold">
            {amount}
          </span>
        </div>

        <p className="text-zinc-500 mt-3 text-sm">
          {status}
        </p>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400">
              AI Confidence
            </span>

            <span className="text-xs text-cyan-400 font-bold">
              {confidence}%
            </span>
          </div>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

          <span className="text-xs text-zinc-400">
            Agent Active
          </span>
        </div>
      </motion.div>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black">
                {company}
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 text-zinc-300">
              <div>
                <p className="text-zinc-500 text-sm">
                  Sponsorship Amount
                </p>

                <h3 className="text-2xl font-bold text-cyan-400">
                  {amount}
                </h3>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  Current Status
                </p>

                <p className="mt-1">
                  {status}
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  AI Match Confidence
                </p>

                <p className="mt-1 text-cyan-400 font-bold">
                  {confidence}%
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  AI Insights
                </p>

                <p className="mt-1">
                  Our agents identified strong alignment between this sponsor
                  and your campaign goals based on industry relevance,
                  historical partnerships, and outreach responsiveness.
                </p>
              </div>

              <button
                className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all"
              >
                Generate Outreach
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}