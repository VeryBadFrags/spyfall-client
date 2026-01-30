import { useToastStore } from "@store/store";

export default function Toast() {
  const { message, show, hideToast } = useToastStore();

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1055 }}
    >
      <div
        className={`toast align-items-center text-bg-success ${show ? "show" : ""}`}
        role="alert"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={hideToast}
          />
        </div>
      </div>
    </div>
  );
}
