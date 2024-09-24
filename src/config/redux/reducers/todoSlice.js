import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "Todos",
    initialState: {
        todo: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.todo.push({
                title: action.payload.title,
                id: nanoid()
            });
        },
        removeTodo: (state, action) => {
            state.todo = state.todo.filter(todo => todo.id !== action.payload.id);
        },
        updateTodo: (state, action) => {
            const index = state.todo.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todo[index].title = action.payload.title;
            }
        }
    }
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
