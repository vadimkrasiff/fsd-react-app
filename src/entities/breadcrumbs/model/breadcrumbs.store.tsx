import { create } from "zustand";

type breadcrumbsStore = {
  currentPath?: string;
  getCurrentPath: () => string | undefined;
  setCurrentPath: (value?: string) => void;
  removeCurrentPath: () => void;
};
export const useBreadcrumbs = create<breadcrumbsStore>((set, get) => ({
  currentPathName: undefined,
  getCurrentPath: () => get().currentPath,
  setCurrentPath: (value) => {
    set({ currentPath: value });
  },
  removeCurrentPath: () => {
    set({ currentPath: undefined });
  },
}));
