import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  addTask: (title, state, description) =>
    set(
      (store) => ({
        tasks: [...store.tasks, { title, state, description }],
      }),
      false,
      "addTask"
    ),
  deleteTask: (title) =>
    set(
      (store) => ({
        tasks: store.tasks.filter((task) => task.title !== title),
      }),
      false,
      "deleteTask"
    ),
  setDraggedTask: (title) =>
    set({ draggedTask: title }, false, "setDraggedTask"),
  moveTask: (title, state, description) =>
    set(
      (store) => ({
        tasks: store.tasks.map((task) =>
          task.title === title ? { title, state, description } : task
        ),
      }),
      false,
      "moveTask"
    ),
});

export const useStore = create(persist(devtools(store), { name: "store" }));
