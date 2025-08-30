import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "outline" | "danger" | "secondary" | "ghost" | "brand";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  as?: React.ElementType;
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", as: Comp = "button", asChild, ...props }, ref) => {
    const Component = asChild ? Comp : "button";
    return (
      <Component
        className={cn(
          "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
          variant === "outline" && "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
          variant === "danger" && "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
          variant === "secondary" && "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500",
          variant === "ghost" && "hover:bg-gray-100 focus:ring-gray-500",
          variant === "brand" && "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";