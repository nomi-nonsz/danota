import { create } from 'zustand';

type Pos = 'left' | 'top' | 'right' | 'bottom';

interface ToolbarPos {
  position: Pos;
  setPos: (pos: Pos) => void;
  toggleLB: () => void;
}

export const useToolbarPosition = create<ToolbarPos>((set) => ({
  position: 'bottom',
  setPos: (pos: Pos) => { set({ position: pos }) },
  toggleLB: () => { set((val) => ({ position: val.position === 'bottom' ? 'left' : 'bottom' })) }
}))