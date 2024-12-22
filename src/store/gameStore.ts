import { create } from 'zustand';
import { User, Dragon, UserSelection } from '../types/game';
import { INITIAL_DRAGONS } from '../types/dragons';

type Tab = 'tap' | 'nests' | 'battle' | 'earn' | 'wallet';

interface GameState {
  user: User | null;
  currentEggProgress: number;
  isHatching: boolean;
  selectedDragon: Dragon | null;
  activeTab: Tab;
  actions: {
    setUser: (user: User | null) => void;
    updateBalance: (amount: number) => void;
    updateEggProgress: (progress: number) => void;
    setHatching: (isHatching: boolean) => void;
    setSelectedDragon: (dragon: Dragon | null) => void;
    addDragon: (dragon: Dragon) => void;
    removeDragon: (dragonId: string) => void;
    setActiveTab: (tab: Tab) => void;
    addSelection: (selection: UserSelection) => void;
    updateSelection: (selection: UserSelection) => void;
  };
}

export const useGameStore = create<GameState>((set) => ({
  user: {
    walletAddress: '0x123...abc',
    coinBalance: 10000,
    dragonsOwned: INITIAL_DRAGONS,
    dailyTaps: 0,
    lastTapReset: new Date(),
    dailyTapLimit: 500,
    selections: []
  },
  currentEggProgress: 0,
  isHatching: false,
  selectedDragon: null,
  activeTab: 'tap',
  actions: {
    setUser: (user) => set({ user }),
    updateBalance: (amount) => set((state) => ({
      user: state.user ? {
        ...state.user,
        coinBalance: state.user.coinBalance + amount
      } : null
    })),
    updateEggProgress: (progress) => set({ currentEggProgress: progress }),
    setHatching: (isHatching) => set({ isHatching }),
    setSelectedDragon: (dragon) => set({ selectedDragon: dragon }),
    addDragon: (dragon) => set((state) => ({
      user: state.user ? {
        ...state.user,
        dragonsOwned: [...state.user.dragonsOwned, dragon]
      } : null
    })),
    removeDragon: (dragonId) => set((state) => ({
      user: state.user ? {
        ...state.user,
        dragonsOwned: state.user.dragonsOwned.filter(d => d.id !== dragonId)
      } : null
    })),
    setActiveTab: (tab) => set({ activeTab: tab }),
    addSelection: (selection) => set((state) => ({
      user: state.user ? {
        ...state.user,
        selections: [...(state.user.selections || []), selection]
      } : null
    })),
    updateSelection: (updatedSelection) => set((state) => ({
      user: state.user ? {
        ...state.user,
        selections: (state.user.selections || []).map(s => 
          s.id === updatedSelection.id ? updatedSelection : s
        )
      } : null
    }))
  },
}));