import { useState } from "react";

const colors = [
  { name: "Rojo", hex: "#EF4444" },
  { name: "Azul", hex: "#3B82F6" },
  { name: "Negro", hex: "#000000" },
  { name: "Blanco", hex: "#FFFFFF", border: "border border-gray-300" },
  // Más colores...
];

export const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Color</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.hex}
            onClick={() => setSelectedColor(color.hex)}
            className={`w-8 h-8 rounded-full ${color.border || ""} ${
              selectedColor === color.hex ? "ring-2 ring-offset-2 ring-rose-500" : ""
            }`}
            style={{ backgroundColor: color.hex }}
            aria-label={color.name}
          />
        ))}
      </div>
    </div>
  );
};