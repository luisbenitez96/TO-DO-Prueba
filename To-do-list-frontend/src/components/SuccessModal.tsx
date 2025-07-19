import React from "react";

interface SuccessModalProps {
  message: string;
  color?: "success" | "danger";
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  message,
  color = "success",
}) => (
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
              stroke={color === "danger" ? "red" : "green"}
              strokeWidth="2">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke={color === "danger" ? "red" : "green"}
                strokeWidth="2"
                fill={color === "danger" ? "#f8d7da" : "#d1e7dd"}
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 13l3 3 6-6"
                stroke={color === "danger" ? "red" : "green"}
                strokeWidth="2.5"
              />
            </svg>
          </div>
          <div className={`alert alert-${color} mb-0`}>{message}</div>
        </div>
      </div>
    </div>
  </div>
);

export default SuccessModal;
