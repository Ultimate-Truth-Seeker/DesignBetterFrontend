import { cn } from '@/lib/utils';

type BadgeProps = {
  variant: 'yellow' | 'gray' | 'blue' | 'green';
  className?: string;  // 👈 Añade esta línea
};

export function Badge({ variant, className }: BadgeProps) {
  const variantClasses = {
    gray: 'bg-gray-200',
    blue: 'bg-blue-200',
    yellow: 'bg-yellow-200',
    green: 'bg-green-200',
  };

  return (
    <span 
      className={cn(
        'inline-block w-3 h-3 rounded-full',
        variantClasses[variant],
        className  // 👈 Aplica la clase adicional
      )} 
    />
  );
}