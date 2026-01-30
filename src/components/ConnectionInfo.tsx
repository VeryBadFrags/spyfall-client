import { useLobbyStore } from "@store/store";

export default function ConnectionInfo() {
  const isConnected = useLobbyStore((state) => state.isConnected);
  if (!isConnected) {
    return (
      <div id="connect-info" className="alert alert-info mb-3">
        <div
          className="spinner-border spinner-border-sm text-primary"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>{" "}
        Connecting to server, please wait
      </div>
    );
  } else {
    return null;
  }
}
