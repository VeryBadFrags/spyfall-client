const Error = function Error(props: { error?: string }) {
  if (props.error) {
    return <div className="alert alert-danger mb-3">{props.error}</div>;
  } else {
    return null;
  }
};

export default Error;
