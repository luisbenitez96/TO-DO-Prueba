import { useState } from "react";
import type { Task } from "../types/Task";

export function useTaskForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<Task["status"]>("Sin iniciar");
  const [formError, setFormError] = useState<string | null>(null);

  const startEdit = (todo: Task) => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setDueDate(todo.due_date ? todo.due_date.slice(0, 10) : "");
    setStatus(todo.status || "Sin iniciar");
    setEditId(todo.id);
    setIsEditing(true);
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("Sin iniciar");
    setFormError(null);
  };

  return {
    isEditing,
    setIsEditing,
    editId,
    setEditId,
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    status,
    setStatus,
    formError,
    setFormError,
    startEdit,
    resetForm,
  };
}
