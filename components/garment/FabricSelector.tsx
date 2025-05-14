import { useState } from "react";

type Fabric = {
  id: string;
  name: string;
  texture?: string; // URL de imagen de textura
};

const fabrics: Fabric[] = [
  { id: "1", name: "Algodón", texture: "/textures/cotton.jpg" },
  { id: "2", name: "Seda", texture: "/textures/silk.jpg" },
  { id: "3", name: "Lino", texture: "/textures/linen.jpg" },
  // Más telas...
];

export const FabricSelector = () => {
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(null);

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Tela</h3>
      <div className="grid grid-cols-3 gap-3">
        {fabrics.map((fabric) => (
          <button
            key={fabric.id}
            onClick={() => setSelectedFabric(fabric)}
            className={`p-2 border rounded-md ${
              selectedFabric?.id === fabric.id ? "ring-2 ring-rose-500" : ""
            }`}
          >
            {fabric.texture && (
              <img
                src={fabric.text