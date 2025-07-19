const API_URL = "http://localhost:8000/api/todos";

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

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener las tareas");
  return await res.json();
};

export const addTodo = async (
  todo: Omit<Todo, "id" | "created_at" | "updated_at">
): Promise<void> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Error al crear la tarea");
};

export const updateTodo = async (
  id: number,
  data: Partial<Todo>
): Promise<void> => {
  const res = await fetch(`http://localhost:8000/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json", // Aseguramos que la respuesta sea JSON
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar la tarea");
};

export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar la tarea");
};

export const updateTodoStatus = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}/toggle`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Error al cambiar el estado de la tarea");
};
