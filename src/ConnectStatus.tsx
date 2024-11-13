import { memo } from "react";

const ConnectStatus = memo(function ConnectStatus(props: {
  connected: boolean;
}) {
  if (!props.connected) {
    return (
      <div id="connect-info" className="alert alert-info mb-3">
        <div
          className="spinner-border spinner-border-sm text-primary"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>{" "}
        Connecting to server, please wait
      </div>
    );
  } else {
    return null;
  }
});

export default ConnectStatus;
