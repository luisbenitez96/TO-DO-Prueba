import React from "react";
import type { Task } from "../types/Task";

interface TaskCardProps {
  todo: Task;
  onToggleCompleted: (id: number) => void;
  onEdit: (todo: Task) => void;
  onDelete: (id: number) => void;
}

const getCardBg = (status: string) => {
  switch (status) {
    case "Completada":
      return "#d1e7dd";
    case "En Proceso":
      return "#fff3cd";
    case "Anulada":
      return "#f8d7da";
    default:
      return "#f8f9fa";
  }
};

const TaskCard: React.FC<TaskCardProps> = ({
  todo,
  onToggleCompleted,
  onEdit,
  onDelete,
}) => (
  <div
    className="card shadow-sm rounded-3 mb-2"
    style={{ background: getCardBg(todo.status) }}>
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <strong className="fs-5">{todo.title}</strong>
          <p className="text-muted mb-1">{todo.description}</p>
          <p className="text-muted small">
            <strong>Fecha límite:</strong>{" "}
            {todo.due_date ? todo.due_date.slice(0, 10) : "-"}
          </p>
          <p className="text-muted small">
            <strong>Estado:</strong>{" "}
            <span
              className={`badge ms-2 ${
                todo.status === "Completada"
                  ? "bg-success"
                  : todo.status === "En Proceso"
                  ? "bg-warning text-dark"
                  : todo.status === "Anulada"
                  ? "bg-danger"
                  : "bg-secondary"
              }`}>
              {todo.status}
            </span>
          </p>
          <p className="text-muted small">
            <strong>Completado:</strong> {todo.completed ? "Sí" : "No"}
          </p>
        </div>
        <div className="d-flex flex-column gap-2">
          <button
            className="btn btn-outline-success btn-sm"
            onClick={() => onToggleCompleted(todo.id)}>
            <i className="bi bi-check-circle me-1"></i>{" "}
            {todo.completed ? "Pendiente" : "Completar"}
          </button>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onEdit(todo)}>
            <i className="bi bi-pencil-square me-1"></i> Editar
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(todo.id)}>
            <i className="bi bi-trash me-1"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default TaskCard;
