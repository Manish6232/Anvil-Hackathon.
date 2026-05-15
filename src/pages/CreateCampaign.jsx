import { motion } from "framer-motion";
import { useState } from "react";

export default function CreateCampaign() {
  const [campaign, setCampaign] = useState({
    name: "",
    category: "",
    goal: "",
    description: "",
  });

  const [created, setCreated] = useState(false);

  const handleChange = (e) => {
    setCampaign({
      ...campaign,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCreated(true);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8"
        >
          <h1 className="text-5xl font-black mb-4">
            Create AI Campaign
          </h1>

          <p className="text-zinc-500 mb-10">
            Launch an autonomous fundraising campaign powered by AI agents.
          </p>

          {created && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl p-4"
            >
              ✅ Campaign launched successfully
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block mb-2 text-zinc-400">
                Campaign Name
              </label>

              <input
                type="text"
                name="name"
                value={campaign.name}
                onChange={handleChange}
                placeholder="AI Startup Summit 2026"
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-zinc-400">
                Category
              </label>

              <select
                name="category"
                value={campaign.category}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-cyan-400"
              >
                <option value="">Select Category</option>
                <option>Hackathon</option>
                <option>Startup</option>
                <option>NGO</option>
                <option>Developer Community</option>
                <option>University Club</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-zinc-400">
                Funding Goal
              </label>

              <input
                type="text"
                name="goal"
                value={campaign.goal}
                onChange={handleChange}
                placeholder="$50,000"
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-zinc-400">
                Campaign Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={campaign.description}
                onChange={handleChange}
                placeholder="Describe your campaign goals..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg transition-all"
            >
              Launch AI Campaign
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
}