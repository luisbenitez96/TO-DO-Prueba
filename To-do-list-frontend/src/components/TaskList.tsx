import React from "react";
import TaskCard from "./TaskCard";
import type { Task } from "../types/Task";

interface TaskListProps {
  tasks: Task[];
  onToggleCompleted: (id: number) => void;
  onEdit: (todo: Task) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleCompleted,
  onEdit,
  onDelete,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="d-flex flex-column align-items-center animate__animated animate__fadeIn animate__faster">
          <i
            className="bi bi-emoji-frown display-3 text-secondary mb-2 animate__animated animate__shakeX animate__delay-1s"
            style={{ animationDuration: "1s" }}></i>
          <div className="fs-5 text-secondary">
            No se encontraron tareas con los filtros seleccionados
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {tasks.map((todo) => (
        <TaskCard
          key={todo.id}
          todo={todo}
          onToggleCompleted={onToggleCompleted}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default TaskList;
