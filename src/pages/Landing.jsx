export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      
      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[120px]" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-6 border-b border-white/10">
        <h1 className="text-3xl font-bold text-cyan-400">
          FundForge AI
        </h1>

        <div className="flex items-center gap-6 text-zinc-400">
          <a href="#">Features</a>
          <a href="#">Agents</a>
          <a href="#">Pipeline</a>
          <a href="#">Docs</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32">
        
        <div className="px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm mb-8">
          Autonomous Fundraising OS
        </div>

        <h1 className="text-7xl font-black leading-tight max-w-6xl">
          AI Agents That
          <span className="text-cyan-400"> Find Sponsors, </span>
          Write Proposals,
          <span className="text-purple-400"> And Raise Money.</span>
        </h1>

        <p className="mt-8 text-zinc-400 text-xl max-w-3xl leading-relaxed">
          FundForge AI automates sponsorship discovery, outreach,
          proposal generation, CRM tracking, and funding operations
          for startups, NGOs, hackathons, and student clubs.
        </p>

        <div className="flex gap-6 mt-12">
          <a
            href="/dashboard"
            className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition-all text-black font-bold"
          >
            Launch Dashboard
          </a>

          <button className="px-8 py-4 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all">
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-24 max-w-4xl w-full">
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-5xl font-black text-cyan-400">$2.4M</h2>
            <p className="text-zinc-500 mt-2">Funding Processed</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-5xl font-black text-purple-400">1,240</h2>
            <p className="text-zinc-500 mt-2">Sponsors Matched</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-5xl font-black text-pink-400">92%</h2>
            <p className="text-zinc-500 mt-2">Agent Efficiency</p>
          </div>

        </div>
      </section>
    </div>
  );
}