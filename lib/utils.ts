
// 1. Manejo de clases CSS (reemplaza clsx/classnames)
export function cn(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
  }
  
  // 2. Formateo de fechas (usando date-fns)
  import  {format}  from 'date-fns/format'
  import  {parseISO}  from 'date-fns/parseISO'
  import  {es}  from 'date-fns/locale/es'
  
  export function formatDate(
    dateString: string,
    pattern: string = 'PP' // 'PP' = 15 ene 2023
  ): string {
    return format(parseISO(dateString), pattern, { locale: es });
  }
  
  // 3. Validación de formularios
  export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // 4. Manejo de errores de API
  export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
  }
  
  // 5. Conversión de moneda
  export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  }
  
  // 6. Slugify para URLs
  export function slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }
  
  // 7. Debounce para búsquedas
  export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number = 300
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }
  
  // 8. Deep merge de objetos (útil para themes)
  export function deepMerge<T extends Record<string, any>>(...objects: T[]): T {
    return objects.reduce((acc, obj) => {
      Object.keys(obj).forEach((key) => {
        const accValue = acc[key];
        const objValue = obj[key];
        if (typeof accValue === 'object' && accValue !== null && 
            typeof objValue === 'object' && objValue !== null) {
          acc[key as keyof T] = deepMerge(accValue, objValue);
        } else {
          acc[key as keyof T] = objValue;
        }
      });
      return acc;
    }, {} as T);
  }