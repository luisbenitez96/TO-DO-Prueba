import React from "react";
import type { Task } from "../types/Task";

interface TaskFormProps {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  dueDate: string;
  setDueDate: (v: string) => void;
  status: Task["status"];
  setStatus: (v: Task["status"]) => void;
  error: string | null;
  isEditing: boolean;
  onSubmit: (e?: React.FormEvent) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  dueDate,
  setDueDate,
  status,
  setStatus,
  error,
  isEditing,
  onSubmit,
  onCancel,
}) => (
  <form
    onSubmit={onSubmit}
    className="d-flex flex-column gap-3 p-3 border rounded bg-light"
    style={{ minWidth: 300 }}>
    <h2 className="mb-3">{isEditing ? "Editar Tarea" : "Nueva Tarea"}</h2>
    {error && <div className="alert alert-danger py-2">{error}</div>}
    <input
      className="form-control"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Título"
      autoFocus
    />
    <input
      className="form-control"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Descripción"
    />
    <input
      className="form-control"
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
    />
    <select
      className="form-select"
      value={status}
      onChange={(e) => setStatus(e.target.value as Task["status"])}>
      <option value="Sin iniciar">Sin iniciar</option>
      <option value="En Proceso">En Proceso</option>
      <option value="Completada">Completada</option>
      <option value="Anulada">Anulada</option>
    </select>
    <div className="d-flex gap-2 mt-2">
      <button className="btn btn-success" type="submit">
        {isEditing ? "Actualizar" : "Guardar"}
      </button>
      <button className="btn btn-secondary" type="button" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  </form>
);

export default TaskForm;
