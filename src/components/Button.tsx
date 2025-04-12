import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className="bg-blue-500 text-white p-2 rounded-md">
      {children}
    </button>
  );
}
