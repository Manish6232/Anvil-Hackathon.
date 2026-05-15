import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 border-r border-zinc-800 p-6">
        <h1 className="text-3xl font-bold text-cyan-400">
          FundForge AI
        </h1>

        <div className="flex flex-col gap-4 mt-10">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/pipeline">Pipeline</Link>
          <Link to="/traces">Traces</Link>
          <Link to="/proposals">Proposals</Link>
        </div>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}