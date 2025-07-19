import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "./store";
import {
  fetchTodos,
  addTodoAsync,
  updateTodoAsync,
  updateTodoStatusAsync,
  deleteTodoAsync,
} from "./store/thunks/todoThunks";
import { useEffect, useState } from "react";

const statusOptions = ["Sin iniciar", "En Proceso", "Completada", "Anulada"];

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading } = useSelector((state: RootState) => state.todos);

  // Local state for modal and form
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<
    "Sin iniciar" | "En Proceso" | "Completada" | "Anulada"
  >("Sin iniciar");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddOrEdit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title || !description || !dueDate) return;
    const todoData = {
      title,
      description,
      due_date: dueDate,
      status,
      completed: false,
    };
    if (isEditing && editId !== null) {
      await dispatch(
        updateTodoAsync({
          id: editId,
          data: todoData,
        })
      );
    } else {
      await dispatch(addTodoAsync(todoData));
    }
    handleModalClose();
  };

  const handleEdit = (todo: any) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setDueDate(todo.due_date ? todo.due_date.slice(0, 10) : "");
    setStatus(todo.status || "Sin iniciar");
    setEditId(todo.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleToggleCompleted = async (id: number) => {
    await dispatch(updateTodoStatusAsync(id));
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteTodoAsync(id));
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditId(null);
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("Sin iniciar");
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <button onClick={() => setShowModal(true)}>Agregar</button>
      {showModal && (
        <Modal onClose={handleModalClose}>
          <form
            onSubmit={handleAddOrEdit}
            style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h2>{isEditing ? "Editar Tarea" : "Nueva Tarea"}</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              autoFocus
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "Sin iniciar"
                    | "En Proceso"
                    | "Completada"
                    | "Anulada"
                )
              }>
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button type="submit">
                {isEditing ? "Actualizar" : "Guardar"}
              </button>
              <button type="button" onClick={handleModalClose}>
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      )}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ul>
          {todos.map((todo: any) => (
            <li key={todo.id}>
              <strong>ID:</strong> {todo.id} <br />
              <strong>Título:</strong> {todo.title} <br />
              <strong>Descripción:</strong> {todo.description} <br />
              <strong>Fecha límite:</strong>{" "}
              {todo.due_date ? todo.due_date.slice(0, 10) : "-"} <br />
              <strong>Estado:</strong> {todo.status} <br />
              <strong>Completado:</strong> {todo.completed ? "Sí" : "No"} <br />
              <button onClick={() => handleToggleCompleted(todo.id)}>
                {todo.completed
                  ? "Marcar como pendiente"
                  : "Marcar como completado"}
              </button>
              <button onClick={() => handleEdit(todo)}>Editar</button>
              <button onClick={() => handleDelete(todo.id)}>Eliminar</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Modal component
const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};
const modalContentStyle: React.CSSProperties = {
  background: "#fff",
  padding: 24,
  borderRadius: 8,
  minWidth: 300,
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
};
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default App;
