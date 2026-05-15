import { motion } from "framer-motion";
import { useState } from "react";

const proposals = [
  {
    sponsor: "NVIDIA",
    title: "AI Innovation Sponsorship",
    amount: "$25K",
    status: "Generated",
    match: "94%",
  },
  {
    sponsor: "GitHub",
    title: "Developer Community Grant",
    amount: "$40K",
    status: "Ready to Send",
    match: "89%",
  },
  {
    sponsor: "Stripe",
    title: "Fintech Education Partnership",
    amount: "$15K",
    status: "Editing",
    match: "92%",
  },
];

export default function Proposals() {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [sentProposal, setSentProposal] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="mb-12">
        <h1 className="text-5xl font-black">AI Proposal Studio</h1>
        <p className="text-zinc-500 mt-4">
          Generate, personalize, and track sponsor proposals.
        </p>
      </div>

      {sentProposal && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl p-4"
        >
          ✅ Proposal sent successfully to {sentProposal}
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {proposals.map((proposal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{proposal.sponsor}</h2>
              <span className="text-cyan-400 font-bold">
                {proposal.amount}
              </span>
            </div>

            <p className="text-zinc-400 mt-4">{proposal.title}</p>

            <div className="mt-6 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                {proposal.status}
              </span>

              <span className="text-sm text-zinc-500">
                Match: {proposal.match}
              </span>
            </div>

            <button
              onClick={() => setSelectedProposal(proposal)}
              className="mt-6 w-full py-3 rounded-2xl bg-cyan-500 text-black font-bold hover:bg-cyan-400"
            >
              Preview Proposal
            </button>
          </motion.div>
        ))}
      </div>

      {selectedProposal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                {selectedProposal.sponsor} Proposal
              </h2>

              <button
                onClick={() => setSelectedProposal(null)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-zinc-300">
              <p>Dear {selectedProposal.sponsor},</p>

              <p>
                We are excited to present a sponsorship partnership opportunity
                focused on innovation, developer outreach, and community growth.
              </p>

              <p>
                Our AI agents identified strong alignment between your
                organization and our campaign objectives.
              </p>

              <p>
                Requested Sponsorship Amount:
                <span className="text-cyan-400 font-bold ml-2">
                  {selectedProposal.amount}
                </span>
              </p>

              <button
                onClick={() => {
                  setSentProposal(selectedProposal.sponsor);
                  setSelectedProposal(null);
                }}
                className="mt-6 px-6 py-3 rounded-2xl bg-cyan-500 text-black font-bold hover:bg-cyan-400"
              >
                Send Proposal
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}