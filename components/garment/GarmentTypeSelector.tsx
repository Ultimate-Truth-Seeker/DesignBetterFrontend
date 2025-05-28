import { useState } from "react";

type GarmentType = {
  id: string;
  name: string;
  image?: string; // Opcional: ícono o preview
};

const garmentTypes: GarmentType[] = [
  { id: "1", name: "Vestido", image: "../icons/dress.png" },
  { id: "2", name: "Blusa", image: "../icons/shirt.png" },
  { id: "3", name: "Pantalón", image: "../icons/pants.png" },
  // Más tipos...
];

export const GarmentTypeSelector = () => {
  const [selectedType, setSelectedType] = useState<GarmentType | null>(null);

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Tipo de prenda</h3>
      <div className="flex flex-wrap gap-2">
        {garmentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type)}
            className={`p-3 border rounded-lg flex items-center gap-2 ${
              selectedType?.id === type.id ? "bg-rose-100 border-rose-300" : ""
            }`}
          >
            {type.image && (
              <img src={type.image} alt={type.name} className="w-6 h-6" />
            )}
            <span>{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};