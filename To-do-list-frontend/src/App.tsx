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
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroFechaLimite, setFiltroFechaLimite] = useState("");
  const [filtroFechaCompletado, setFiltroFechaCompletado] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddOrEdit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      setFormError("Todos los campos son obligatorios.");
      return;
    }
    try {
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
        setFormSuccess("Tarea actualizada correctamente.");
      } else {
        await dispatch(addTodoAsync(todoData));
        setFormSuccess("Tarea agregada correctamente.");
      }
      setTimeout(() => setFormSuccess(null), 2000);
      handleModalClose();
    } catch (err: any) {
      setFormError("Ocurrió un error al guardar la tarea.");
    }
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
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    // Si está completado, lo marcamos como pendiente y status 'En proceso'.
    // Si no está completado, lo marcamos como completado y status 'Completada'.
    await dispatch(
      updateTodoAsync({
        id,
        data: {
          completed: !todo.completed,
          status: !todo.completed ? "Completada" : "En Proceso",
        },
      })
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteTodoAsync(id));
      setDeleteSuccess("Tarea eliminada con éxito.");
      setTimeout(() => setDeleteSuccess(null), 2000);
    } catch (err) {
      setFormError("Ocurrió un error al eliminar la tarea.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditId(null);
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("Sin iniciar");
    setFormError(null);
  };

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

  // Elimina el estado y el botón de filtrarEnProceso
  // Elimina la lógica de filtrado que depende de filtrarEnProceso, usa solo los filtros avanzados
  const tareasFiltradas = todos.filter(
    (todo) =>
      (!filtroEstado ||
        todo.status.toLowerCase().trim() ===
          filtroEstado.toLowerCase().trim()) &&
      (!filtroFechaLimite ||
        (todo.due_date && todo.due_date.slice(0, 10) === filtroFechaLimite))
  );

  return (
    <div
      className="d-flex justify-content-center align-items-start min-vh-100"
      style={{ background: "#f8f9fa" }}>
      <div className="container py-4" style={{ maxWidth: 600 }}>
        <h1 className="mb-4">Lista de Tareas</h1>
        {formSuccess && (
          <div
            className="modal fade show"
            tabIndex={-1}
            style={{ display: "block", background: "rgba(0,0,0,0.2)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <div className="mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="green"
                      strokeWidth="2">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="green"
                        strokeWidth="2"
                        fill="#d1e7dd"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 13l3 3 6-6"
                        stroke="green"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                  <div className="alert alert-success mb-0">{formSuccess}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {deleteSuccess && (
          <div
            className="modal fade show"
            tabIndex={-1}
            style={{ display: "block", background: "rgba(0,0,0,0.2)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <div className="mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="red"
                      strokeWidth="2">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="red"
                        strokeWidth="2"
                        fill="#f8d7da"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 13l3 3 6-6"
                        stroke="red"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                  <div className="alert alert-success mb-0">
                    {deleteSuccess}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mb-3 d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}>
            Agregar
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setMostrarFiltros((f) => !f)}>
            <i className="bi bi-funnel me-1"></i> Filtros
          </button>
        </div>
        {mostrarFiltros && (
          <div className="card p-3 mb-4">
            <div className="row g-2">
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}>
                  <option value="">Todos los estados</option>
                  <option value="Sin iniciar">Sin iniciar</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Completada">Completada</option>
                  <option value="Anulada">Anulada</option>
                </select>
              </div>
              <div className="col-md-6">
                <input
                  type="date"
                  className="form-control"
                  value={filtroFechaLimite}
                  onChange={(e) => setFiltroFechaLimite(e.target.value)}
                />
              </div>
              <div className="col-12 mt-2">
                <button
                  className="btn btn-secondary w-100"
                  onClick={() => {
                    setFiltroEstado("");
                    setFiltroFechaLimite("");
                  }}>
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <Modal onClose={handleModalClose}>
            <form
              onSubmit={handleAddOrEdit}
              className="d-flex flex-column gap-3 p-3 border rounded bg-light"
              style={{ minWidth: 300 }}>
              <h2 className="mb-3">
                {isEditing ? "Editar Tarea" : "Nueva Tarea"}
              </h2>
              {formError && (
                <div className="alert alert-danger py-2">{formError}</div>
              )}
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
                onChange={(e) => setStatus(e.target.value as any)}>
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="d-flex gap-2 mt-2">
                <button className="btn btn-success" type="submit">
                  {isEditing ? "Actualizar" : "Guardar"}
                </button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleModalClose}>
                  Cancelar
                </button>
              </div>
            </form>
          </Modal>
        )}
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: 100 }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <>
            <ul className="list-group">
              {tareasFiltradas.length === 0 ? (
                <li className="list-group-item text-center border-0 bg-transparent">
                  <div className="d-flex flex-column align-items-center animate__animated animate__fadeIn animate__faster">
                    <i
                      className="bi bi-emoji-frown display-3 text-secondary mb-2 animate__animated animate__shakeX animate__delay-1s"
                      style={{ animationDuration: "1s" }}></i>
                    <div className="fs-5 text-secondary">
                      No se encontraron tareas con los filtros seleccionados
                    </div>
                  </div>
                </li>
              ) : (
                tareasFiltradas.map((todo: any) => (
                  <li key={todo.id} className="list-group-item mb-2">
                    <div
                      className="card shadow-sm rounded-3"
                      style={{ background: getCardBg(todo.status) }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong className="fs-5">{todo.title}</strong>
                            <p className="text-muted mb-1">
                              {todo.description}
                            </p>
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
                              <strong>Completado:</strong>{" "}
                              {todo.completed ? "Sí" : "No"}
                            </p>
                          </div>
                          <div className="d-flex flex-column gap-2">
                            <button
                              className="btn btn-outline-success btn-sm w-100 m-0"
                              onClick={() => handleToggleCompleted(todo.id)}>
                              <i className="bi bi-check-circle me-1"></i>{" "}
                              {todo.completed ? "Pendiente" : "Completar"}
                            </button>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleEdit(todo)}>
                              <i className="bi bi-pencil-square me-1"></i>{" "}
                              Editar
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(todo.id)}>
                              <i className="bi bi-trash me-1"></i> Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </div>
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
