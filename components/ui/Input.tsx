import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';
import * as React from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClass?: string;
}

function Input({
  label,
  name,
  type = 'text',
  defaultValue,
  disabled = false,
  id = name,
  placeholder,
  required,
  className,
  containerClass,
  ...props
}: InputProps) {
  return (
    <div className={cn('space-y-1', containerClass)}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        className={cn(
          'block w-full rounded-md border-gray-300 shadow-sm',
          'focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
          disabled && 'bg-gray-100 cursor-not-allowed',
          className
        )}
        {...props}
      />
    </div>
  );
}

function InputUI({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input, InputUI }
