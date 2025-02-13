import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create (
    persist (
        (set) => ({
            todos: [],
            addTodo: (id, text) => set((state) => {
                return [...state.todos, {id:id, text:text, fadeOut:false, done:false}];
            }),
            removeTodo: (id) => {
               // first set fadeOut for todo that should be deleted
               set((state) => state.todos.map((todo) => 
                ((id == todo.id) ? {...todo, fadeOut: true} : todo)
               ));
            
               // delete todo after fadeout animation is complete
               setTimeout(
                () => { 
                    set((state) => state.todos.filter((todo)=> todo.id !== id))
                }, 500);
            },

        })
    )
);

export default useStore;