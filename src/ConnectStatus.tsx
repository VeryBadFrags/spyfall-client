import React from "react";

interface ErrorProps {
  connected: boolean;
}

function ConnectStatus({ connected }: ErrorProps) {
  if (!connected) {
    return (
      <div id="connect-info" className="alert alert-info mb-3">
        <div
          className="spinner-border spinner-border-sm text-primary"
          role="status"
        >
          <span className="sr-only">Connecting to server</span>
        </div>{" "}
        Connecting to server, please wait
      </div>
    );
  } else {
    return null;
  }
}

export default ConnectStatus;
