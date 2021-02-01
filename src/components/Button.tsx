import React from "react";

interface ButtonProps {
  children?: any;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
}

function Button(props: ButtonProps) {
  const { children, onClick, className, loading } = props;
  return (
    <button
      className={`p-2 bg-red-500 text-center ${className}`}
      onClick={onClick}
    >
      <div className="flex">
        {" "}
        {loading && <>loading...</>}
        {!loading && <>{children}</>}
      </div>
    </button>
  );
}

export default Button;
