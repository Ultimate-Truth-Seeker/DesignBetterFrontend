import { useState } from "react";

export interface SearchBarProps {
  variant?: "simple" | "left-icon" | "right-icon" | "two-icons";
  placeholder?: string;
  onSearch?: (query: string) => void;
  disabled?: boolean;
  value?: string;
  className?: string;
}

export const SearchBar = ({
  variant = "simple",
  placeholder = "Buscar...",
  onSearch,
  disabled = false,
  value: controlledValue,
  className = ""
}: SearchBarProps) => {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
        stroke="#999999" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M18 6L6 18M6 6L18 18" 
        stroke="#2B2B2B" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  const renderLeftIcon = () => {
    if (variant === "simple" || variant === "right-icon") return null;
    
    return (
      <div className="flex items-center justify-center w-11 h-11">
        <SearchIcon />
      </div>
    );
  };

  const renderRightIcon = () => {
    if (variant === "simple" || variant === "left-icon") return null;
    
    return (
      <div className="flex items-center justify-center w-11 h-11">
        {variant === "two-icons" ? <CloseIcon /> : <SearchIcon />}
      </div>
    );
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`
        flex flex-row items-center p-3 bg-white rounded-lg
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {renderLeftIcon()}
      
      <div className="relative flex-1 mx-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full pl-10 pr-4 py-2 text-sm font-semibold
            bg-[#FBFBFB] border border-[#EBEBEB] rounded-full
            focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-300
            disabled:opacity-50 disabled:cursor-not-allowed
            ${variant === "simple" ? "pr-10" : ""}
          `}
          style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
        />
      </div>

      {renderRightIcon()}
    </form>
  );
};

// Versión alternativa con diferentes estilos para cada variante
export const AlternativeSearchBar = ({
  variant = "simple",
  placeholder = "Buscar...",
  onSearch,
  disabled = false,
  value: controlledValue,
  className = ""
}: SearchBarProps) => {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path 
        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path 
        d="M18 6L6 18M6 6L18 18" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  // Estilos base para todas las variantes
  const baseStyles = "flex items-center bg-white rounded-full border border-[#EBEBEB] overflow-hidden";
  
  // Estilos específicos para cada variante
  const variantStyles = {
    simple: "pl-4 pr-4",
    "left-icon": "pl-2 pr-4",
    "right-icon": "pl-4 pr-2",
    "two-icons": "pl-2 pr-2"
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`
        ${baseStyles} 
        ${variantStyles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {/* Icono izquierdo */}
      {(variant === "left-icon" || variant === "two-icons") && (
        <div className="flex items-center justify-center w-11 h-11 text-[#2B2B2B]">
          <SearchIcon />
        </div>
      )}

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          flex-1 px-3 py-2 h-10 bg-[#FBFBFB] text-sm font-semibold
          focus:outline-none focus:bg-white
          disabled:opacity-50 disabled:cursor-not-allowed
          placeholder:text-[#999999]
        `}
        style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
      />

      {/* Icono derecho */}
      {(variant === "right-icon" || variant === "two-icons") && (
        <div className="flex items-center justify-center w-11 h-11 text-[#2B2B2B]">
          {variant === "two-icons" ? <CloseIcon /> : <SearchIcon />}
        </div>
      )}

      {/* Para la variante simple, el icono de búsqueda está dentro del input */}
      {variant === "simple" && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#999999] pointer-events-none">
          <SearchIcon />
        </div>
      )}
    </form>
  );
};