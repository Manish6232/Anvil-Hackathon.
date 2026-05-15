
import { create } from 'zustand';

export const useFundStore = create((set) => ({
  totalRaised: 248650,
  activeCampaigns: 3,
  agents: [
    { id: 1, name: "SponsorHunter", status: "running", progress: 92, color: "cyan" },
    { id: 2, name: "ProposalWriter", status: "running", progress: 67, color: "purple" },
    { id: 3, name: "RelationshipBuilder", status: "idle", progress: 30, color: "pink" },
  ],
  traces: [],
  pipeline: [],

  addTrace: (trace) => set((state) => ({
    traces: [trace, ...state.traces].slice(0, 25)
  })),

  updateAgent: (id, updates) => set((state) => ({
    agents: state.agents.map(a => a.id === id ? { ...a, ...updates } : a)
  }))
}));