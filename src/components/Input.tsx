import React from "react";

interface InputProps {
  onChange?: (e: any) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}

function Input(props: InputProps) {
  const { onChange, value, placeholder, className } = props;
  return (
    <input
      className={`p-2 text-black ${className}`}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    ></input>
  );
}

export default Input;
