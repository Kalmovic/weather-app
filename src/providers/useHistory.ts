import { create } from "zustand";

type HistoryType = {
  name: string;
  country: string;
  region: string;
};

type Store = {
  history: HistoryType[];
  setHistory: (newRecord: HistoryType) => void;
};

export const useHistory = create<Store>()((set) => ({
  history: [],
  setHistory: (newRecord: HistoryType) => {
    set((state) => {
      const lastHKey =
        state.history[0]?.name +
        state.history[0]?.region +
        state.history[0]?.country;
      const newHKey = newRecord.name + newRecord.region + newRecord.country;
      if (lastHKey === newHKey) return state;
      const newHistory = [newRecord, ...state.history];
      localStorage.setItem("history", JSON.stringify(newHistory));
      return { history: newHistory };
    });
  },
}));
