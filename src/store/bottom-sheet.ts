import { create } from 'zustand';

type BottomSheetStore = {
  isOpen: boolean;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  toggleBottomSheet: () => void;
}

export const useAreaPremiumStore = create<BottomSheetStore>((set) => ({
  isOpen: false,
  openBottomSheet: () => set(() => ({ isOpen: true })),
  closeBottomSheet: () => set(() => ({ isOpen: false })),
  toggleBottomSheet: () => set((state) => ({ isOpen: !state.isOpen })),
}));
