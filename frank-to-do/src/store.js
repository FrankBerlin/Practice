import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create (
    persist (
        (set) => ({
            todos: [],
            addTodo: (id, text) => set((state) => {
                return [...state.todos, {id:id, text:text, done:false}];
            }),
        })
    )
);

export default useStore;