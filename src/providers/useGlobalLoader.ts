import { create } from "zustand";

type Store = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useGlobalLoaderStore = create<Store>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));
