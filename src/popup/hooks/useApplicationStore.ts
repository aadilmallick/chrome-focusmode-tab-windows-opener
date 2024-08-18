import type { TabGroup } from "app/background/controllers/storageController";
import { create } from "zustand";

interface Store {
  tabGroups: TabGroup[];
  setTabGroups: (tabGroups: TabGroup[]) => void;
}

export const useApplicationStore = create<Store>((set) => ({
  tabGroups: [],
  setTabGroups: (tabGroups) => set({ tabGroups }),
}));
