import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClass?: string;
}

export function Input({
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