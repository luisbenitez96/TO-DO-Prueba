import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTodos,
  addTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
} from "../../api/todoService";
import type { Todo } from "../slices/todoSlice";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return await getTodos();
});
export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async (todo: Omit<Todo, "id" | "created_at" | "updated_at">) => {
    await addTodo(todo);
    return await getTodos();
  }
);
export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, data }: { id: number; data: Partial<Todo> }) => {
    await updateTodo(id, data);
    return await getTodos();
  }
);

export const updateTodoStatusAsync = createAsyncThunk(
  "todos/updateTodoStatus",
  async (id: number) => {
    await updateTodoStatus(id);
    return await getTodos();
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    await deleteTodo(id);
    return await getTodos();
  }
);
