import { memo, ReactNode } from "react";

interface CardProps {
  header?: string;
  hasBody?: boolean;
  className?: string;
  children: ReactNode;
}

const Card = memo(function Card({
  header,
  hasBody = true,
  className,
  children,
}: CardProps) {
  return (
    <div className="col">
      <div
        className={
          "card shadow border border-dark " + (className ? className : "")
        }
      >
        {header ? <div className="card-header">{header}</div> : null}
        {hasBody ? <div className="card-body">{children}</div> : children}
      </div>
    </div>
  );
});

export default Card;
