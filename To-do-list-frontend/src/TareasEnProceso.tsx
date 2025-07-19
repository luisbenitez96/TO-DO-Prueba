import React from "react";
import type { Todo } from "./store/slices/todoSlice";

interface Props {
  todos: Todo[];
}

const TareasEnProceso: React.FC<Props> = ({ todos }) => {
  const enProceso = todos.filter((todo) => todo.status === "En Proceso");
  if (enProceso.length === 0) return <div>No hay tareas en proceso.</div>;
  return (
    <div>
      <h2>Tareas en Proceso</h2>
      <ul>
        {enProceso.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> - {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TareasEnProceso;
