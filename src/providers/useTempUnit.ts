import { TempUnit, getTempUnit } from "@/lib/utils";
import { create } from "zustand";

type Store = {
  tempUnit: TempUnit;
  setTempUnit: (tempUnit: TempUnit) => void;
};

export const useTempUnitStore = create<Store>()((set) => ({
  tempUnit: getTempUnit(),
  setTempUnit: (tempUnit: TempUnit) => {
    localStorage.setItem("tempUnit", tempUnit);
    set(() => ({ tempUnit }));
  },
}));
