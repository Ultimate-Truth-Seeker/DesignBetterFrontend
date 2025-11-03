import React from 'react';

interface BodyMeasurementsProps {
  measurements: {
    altura: string;
    peso: string;
    pecho: string;
    cintura: string;
    cadera: string;
    busto: string;
    largoFalda: string;
    largoTotal: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BodyMeasurements: React.FC<BodyMeasurementsProps> = ({ measurements, onChange }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <label htmlFor="altura" className="block text-sm font-medium">Altura (cm)</label>
        <input type="number" id="altura" name="altura" value={measurements.altura} onChange={onChange} className="w-full border rounded p-2" />
      </div>
      <div>
        <label htmlFor="peso" className="block text-sm font-medium">Peso (kg)</label>
        <input type="number" id="peso" name="peso" value={measurements.peso} onChange={onChange} className="w-full border rounded p-2" />
      </div>
      <div>
        <label htmlFor="pecho" className="block text-sm font-medium">Pecho (cm)</label>
        <input type="number" id="pecho" name="pecho" value={measurements.pecho} onChange={onChange} className="w-full border rounded p-2" />
      </div>
      <div>
        <label htmlFor="cintura" className="block text-sm font-medium">Cintura (cm)</label>
        <input type="number" id="cintura" name="cintura" value={measurements.cintura} onChange={onChange} className="w-full border rounded p-2" />
      </div>
      <div>
        <label htmlFor="cadera" className="block text-sm font-medium">Cadera (cm)</label>
        <input type="number" id="cadera" name="cadera" value={measurements.cadera} onChange={onChange} className="w-full border rounded p-2" />
      </div>
      <div>
        <label htmlFor="busto" className="block text-sm font-medium">Busto (cm)</label>
        <input type="number" id="busto" name="busto" value={measurements.busto} onChange={onChange} className="w-full border rounded p-2" />
      </div>
      <div>
        <label htmlFor="largoFalda" className="block text-sm font-medium">Largo de Falda (cm)</label>
        <input type="number" id="largoFalda" name="largoFalda" value={measurements.largoFalda} onChange={onChange} className="w-full border rounded p-2" />
      </div>
      <div>
        <label htmlFor="largoTotal" className="block text-sm font-medium">Largo Total (cm)</label>
        <input type="number" id="largoTotal" name="largoTotal" value={measurements.largoTotal} onChange={onChange} className="w-full border rounded p-2" />
      </div>
    </div>
  );
};