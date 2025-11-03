import { Outlet } from "react-router-dom";
import { DesignerNavbar } from "../../unused/DesignerNavbar";

export const DesignerPanel = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DesignerNavbar />
      <div className="max-w-6xl mx-auto p-6">
        <Outlet /> {/* Aquí se renderizarán las opciones seleccionadas */}
      </div>
    </div>
  );
};