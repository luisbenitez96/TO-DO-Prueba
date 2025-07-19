import React from "react";

interface FilterPanelProps {
  status: string;
  onStatusChange: (value: string) => void;
  dueDate: string;
  onDueDateChange: (value: string) => void;
  onClear: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  status,
  onStatusChange,
  dueDate,
  onDueDateChange,
  onClear,
}) => (
  <div className="card p-3 mb-4">
    <div className="row g-2">
      <div className="col-md-6">
        <select
          className="form-select"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}>
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
          value={dueDate}
          onChange={(e) => onDueDateChange(e.target.value)}
        />
      </div>
      <div className="col-12 mt-2">
        <button className="btn btn-secondary w-100" onClick={onClear}>
          Limpiar filtros
        </button>
      </div>
    </div>
  </div>
);

export default FilterPanel;
