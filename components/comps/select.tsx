import { useState, useRef, useEffect } from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Select = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Seleccionar...", 
  disabled = false 
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  const handleOptionClick = (option: SelectOption) => {
    if (!option.disabled) {
      onChange?.(option.value);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-32" ref={selectRef}>
      <div 
        className={`
          flex items-center justify-between w-full px-3 py-2 
          border border-[#131414] rounded-lg cursor-pointer
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:bg-gray-50"}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`text-sm ${!selectedOption ? "text-gray-400" : ""}`}>
          {selectedOption?.label || placeholder}
        </span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path 
            d="M12.7267 5.94L8.66668 10L4.60668 5.94L3.66668 6.88L8.66668 11.88L13.6667 6.88L12.7267 5.94Z" 
            fill="#131414" 
          />
        </svg>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[#131414] rounded-lg shadow-lg">
          <ul className="py-1 overflow-auto max-h-60">
            {options.map((option) => (
              <li
                key={option.value}
                className={`
                  px-3 py-2 text-sm cursor-pointer
                  ${option.value === value ? "bg-rose-50 text-rose-600" : ""}
                  ${option.disabled 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "hover:bg-gray-100"
                  }
                `}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};