import { ReactNode } from "react";

interface CardProps {
  header?: string;
  hasBody?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Card({
  header,
  hasBody = true,
  className,
  children,
}: CardProps) {
  return (
    <div className="col">
      <div className={"card shadow " + (className ? className : null)}>
        {header ? <div className="card-header">{header}</div> : null}
        {hasBody ? <div className="card-body">{children}</div> : children}
      </div>
    </div>
  );
}
