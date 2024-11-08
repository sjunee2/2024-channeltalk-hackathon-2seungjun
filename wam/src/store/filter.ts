import { create } from 'zustand'

interface FilterState {
  status: string
  role: string
  assignUser: number | null
  setStatus: (status: string) => void
  setRole: (role: string) => void
  setAssignUser: (assignUser: number) => void
}

const useFilterStore = create<FilterState>()((set) => ({
  status: 'none',
  role: 'none',
  assignUser: null,
  setStatus: (status: string) => set({ status }),
  setRole: (role: string) => set({ role }),
  setAssignUser: (assignUser: number) => set({ assignUser }),
}))

export { useFilterStore }
