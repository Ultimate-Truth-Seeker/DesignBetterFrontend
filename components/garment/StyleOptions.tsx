import { useState } from "react";

type StyleOption = {
  id: string;
  name: string;
  description?: string;
};

const styles: StyleOption[] = [
  { id: "1", name: "Bohemio", description: "Fluyente y con detalles artesanales" },
  { id: "2", name: "Minimalista", description: "Líneas simples y colores neutros" },
  { id: "3", name: "Clásico", description: "Cortes tradicionales" },
  // Más estilos...
];

export const StyleOptions = () => {
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Estilo</h3>
      <div className="space-y-2">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => setSelectedStyle(style)}
            className={`p-3 border rounded-lg cursor-pointer ${
              selectedStyle?.id === style.id ? "bg-rose-50 border-rose-300" : ""
            }`}
          >
            <h4 className="font-medium">{style.name}</h4>
            {style.description && (
              <p className="text-sm text-gray-600">{style.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};