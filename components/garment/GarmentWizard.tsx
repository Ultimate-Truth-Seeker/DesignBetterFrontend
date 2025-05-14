import { ColorPicker } from "./ColorPicker";
import { FabricSelector } from "./FabricSelector";
import { GarmentTypeSelector } from "./GarmentTypeSelector";
import { StyleOptions } from "./StyleOptions";

export const GarmentWizard = () => (
  <div className="space-y-6">
    <GarmentTypeSelector />
    <FabricSelector />
    <ColorPicker />
    <StyleOptions />
  </div>
);