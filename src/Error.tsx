import React from "react";

interface ErrorProps {
  error?: string;
}

function Error({ error }: ErrorProps) {
  if (error) {
    return <div className="alert alert-danger mb-3">{error}</div>;
  } else {
    return null;
  }
}

export default Error;
