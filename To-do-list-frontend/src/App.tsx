import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import FilterPanel from "./components/FilterPanel";
import SuccessModal from "./components/SuccessModal";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "./store";
import {
  fetchTodos,
  addTodoAsync,
  updateTodoAsync,
  deleteTodoAsync,
} from "./store/thunks/todoThunks";
import type { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import { useTaskForm } from "./hooks/useTaskForm";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading } = useSelector((state: RootState) => state.todos);

  // Estado para filtros y modales
  const [showModal, setShowModal] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroFechaLimite, setFiltroFechaLimite] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const {
    isEditing,
    editId,
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
  } = useTaskForm();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Filtrado
  const tareasFiltradas: Task[] = todos.filter(
    (todo) =>
      (!filtroEstado ||
        todo.status.toLowerCase().trim() ===
          filtroEstado.toLowerCase().trim()) &&
      (!filtroFechaLimite ||
        (todo.due_date && todo.due_date.slice(0, 10) === filtroFechaLimite))
  );

  // Handlers
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
        await dispatch(updateTodoAsync({ id: editId, data: todoData }));
        setFormSuccess("Tarea actualizada correctamente.");
      } else {
        await dispatch(addTodoAsync(todoData));
        setFormSuccess("Tarea agregada correctamente.");
      }
      setTimeout(() => setFormSuccess(null), 2000);
      handleModalClose();
    } catch {
      setFormError("Ocurrió un error al guardar la tarea.");
    }
  };
  const handleEdit = (todo: Task) => {
    startEdit(todo);
    setShowModal(true);
  };
  const handleToggleCompleted = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
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
    } catch {
      setFormError("Ocurrió un error al eliminar la tarea.");
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start min-vh-100"
      style={{ background: "#f8f9fa" }}>
      <div className="container py-4" style={{ maxWidth: 600 }}>
        <h1 className="mb-4">Lista de Tareas</h1>
        {formSuccess && <SuccessModal message={formSuccess} color="success" />}
        {deleteSuccess && (
          <SuccessModal message={deleteSuccess} color="danger" />
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
          <FilterPanel
            status={filtroEstado}
            onStatusChange={setFiltroEstado}
            dueDate={filtroFechaLimite}
            onDueDateChange={setFiltroFechaLimite}
            onClear={() => {
              setFiltroEstado("");
              setFiltroFechaLimite("");
            }}
          />
        )}
        {showModal && (
          <div
            className="modal fade show"
            tabIndex={-1}
            style={{ display: "block", background: "rgba(0,0,0,0.2)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <TaskForm
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    status={status}
                    setStatus={setStatus}
                    error={formError}
                    isEditing={isEditing}
                    onSubmit={handleAddOrEdit}
                    onCancel={handleModalClose}
                  />
                </div>
              </div>
            </div>
          </div>
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
          <TaskList
            tasks={tareasFiltradas}
            onToggleCompleted={handleToggleCompleted}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default App;
