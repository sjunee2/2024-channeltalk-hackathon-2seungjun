import { create } from 'zustand'

interface AppIdState {
  appId: string
  setAppId: (appId: string) => void
}

const useAppIdStore = create<AppIdState>()((set) => ({
  appId: '',
  setAppId: (appId) => set({ appId }),
}));

export { useAppIdStore }