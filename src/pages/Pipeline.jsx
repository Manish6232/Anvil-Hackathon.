import { motion } from "framer-motion";
import SponsorCard from "../components/pipeline/SponsorCard";

const pipelineData = [
  {
    title: "Lead Found",
    color: "border-cyan-500/20",
    cards: [
      {
        company: "NVIDIA",
        amount: "$25K",
        status: "Researching sponsor fit",
      },
      {
        company: "Stripe",
        amount: "$15K",
        status: "Scanning partnership history",
      },
    ],
  },

  {
    title: "Proposal Drafted",
    color: "border-purple-500/20",
    cards: [
      {
        company: "GitHub",
        amount: "$40K",
        status: "Proposal generated",
      },
    ],
  },

  {
    title: "Outreach Sent",
    color: "border-pink-500/20",
    cards: [
      {
        company: "Vercel",
        amount: "$18K",
        status: "Awaiting response",
      },
    ],
  },

  {
    title: "Negotiating",
    color: "border-yellow-500/20",
    cards: [
      {
        company: "OpenAI",
        amount: "$60K",
        status: "Finalizing sponsorship terms",
      },
    ],
  },
];

export default function Pipeline() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="mb-12">
        <h1 className="text-5xl font-black">
          Sponsorship Pipeline
        </h1>

        <p className="text-zinc-500 mt-4">
          Autonomous fundraising workflow managed by AI agents.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {pipelineData.map((column, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className={`bg-white/5 border ${column.color} rounded-3xl p-5`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {column.title}
              </h2>

              <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-zinc-400">
                {column.cards.length}
              </span>
            </div>

            <div className="space-y-4">
              {column.cards.map((card, i) => (
                <SponsorCard
                  key={i}
                  company={card.company}
                  amount={card.amount}
                  status={card.status}
                  confidence={Math.floor(Math.random() * 20) + 80}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}