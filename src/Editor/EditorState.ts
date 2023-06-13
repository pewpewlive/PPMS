import { create } from "zustand"

interface EditorState {
  selectedVertex: number
  setSelectedVertex: (vertex: number) => void
}
export const selectedVertexStore = create<EditorState>(set => ({
  selectedVertex: 0,
  setSelectedVertex: (vertex: number) => set({ selectedVertex: vertex }),
}))
