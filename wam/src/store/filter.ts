import { create } from 'zustand'

interface FilterState {
  status: string
  role: string
  assignUser: string
  setStatus: (status: string) => void
  setRole: (role: string) => void
  setAssignUser: (assignUser: string) => void
}

const useFilterStore = create<FilterState>()((set) => ({
  status: 'none',
  role: 'none',
  assignUser: 'none',
  setStatus: (status: string) => set({ status }),
  setRole: (role: string) => set({ role }),
  setAssignUser: (assignUser: string) => set({ assignUser }),
}));

export { useFilterStore }