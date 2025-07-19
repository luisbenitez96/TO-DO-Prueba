export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  status: "Sin iniciar" | "En Proceso" | "Completada" | "Anulada";
  due_date?: string;
  created_at?: string;
  updated_at?: string;
}
