interface ErrorProps {
  error?: string;
}

export default function Error({ error }: ErrorProps) {
  if (error) {
    return <div className="alert alert-danger mb-3">{error}</div>;
  } else {
    return null;
  }
}
