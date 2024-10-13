import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));
