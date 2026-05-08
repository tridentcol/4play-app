import type { Sport } from '@4play/core';
import { create } from 'zustand';

export type Filters = {
  sport: Sport;
  radiusKm: number;
  minLevel: number;
  maxLevel: number;
};

type FiltersStore = Filters & {
  set: (next: Partial<Filters>) => void;
  reset: () => void;
};

const DEFAULT: Filters = {
  sport: 'tennis',
  radiusKm: 10,
  minLevel: 1.0,
  maxLevel: 7.0,
};

export const useFilters = create<FiltersStore>((set) => ({
  ...DEFAULT,
  set: (next) => set((state) => ({ ...state, ...next })),
  reset: () => set(DEFAULT),
}));
