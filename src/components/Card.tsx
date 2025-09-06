import type { ReactNode } from "react";

interface CardProps {
  header?: string;
  hasBody?: boolean;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

export default function Card({
  header,
  hasBody = true,
  className,
  children,
  icon,
}: CardProps) {
  return (
    <div className="col">
      <div
        className={
          "card shadow border border-dark " + (className ? className : "")
        }
      >
        {header ? (
          <div className="card-header">
            {icon ? <span>{icon} </span> : null}
            {header}
          </div>
        ) : null}
        {hasBody ? <div className="card-body">{children}</div> : children}
      </div>
    </div>
  );
}
