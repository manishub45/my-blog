import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1 text-sm text-zinc-700">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        className={`w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-black 
          placeholder:text-zinc-400 outline-none 
          focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:text-zinc-500 disabled:cursor-not-allowed
          transition ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
