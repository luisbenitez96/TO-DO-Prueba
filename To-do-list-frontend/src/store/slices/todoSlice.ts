import { createSlice } from "@reduxjs/toolkit";

import {
  addTodoAsync,
  deleteTodoAsync,
  fetchTodos,
  updateTodoAsync,
  updateTodoStatusAsync,
} from "../thunks/todoThunks";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  status: "Sin iniciar" | "En Proceso" | "Completada" | "Anulada";
  due_date?: string;
  created_at?: string;
  updated_at?: string;
}

interface todoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}
const initialState: todoState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload as Todo[];
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      // Repite para add, update, delete
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos = action.payload as Todo[];
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        state.todos = action.payload as Todo[];
      })
      .addCase(updateTodoStatusAsync.fulfilled, (state, action) => {
        state.todos = action.payload as Todo[];
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = action.payload as Todo[];
      });
  },
});

export default todoSlice.reducer;
