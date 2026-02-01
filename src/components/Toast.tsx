import { useToastStore } from "@store/store";
import "./Toast.scss";

export default function Toast() {
  const { message, show, variant, hideToast } = useToastStore();

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1055 }}
    >
      <div
        className={`toast align-items-center text-bg-${variant} ${show ? "show" : ""}`}
        role="alert"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className={`btn-close me-2 m-auto ${variant === "success" ? "btn-close-white" : ""}`}
            onClick={hideToast}
          />
        </div>
      </div>
    </div>
  );
}
