import React, { forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`bg-gray-50 rounded-md border border-gray-200 focus:border-[var(--addi-color-500)] focus:ring-1 focus:ring-[var(--addi-color-500)] focus:outline-none px-3 py-2 w-full transition-colors duration-200 ${
        className || ""
      }`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
