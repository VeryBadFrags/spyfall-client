import { FaSignOutAlt } from "react-icons/fa";

export default function DisconnectButton(props: {
  disconnectCallback: () => void;
}) {
  return (
    <div className="d-grid">
      <button
        className="btn btn-sm btn-danger"
        onClick={() => props.disconnectCallback()}
      >
        <FaSignOutAlt /> Leave lobby
      </button>
    </div>
  );
}
