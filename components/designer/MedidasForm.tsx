'use client';
import React, { useEffect, useState } from 'react';

interface Props {
  medidasEsperadas: string[]; // ['largo', 'ancho', ...]
  valoresIniciales?: Record<string, number>;
  onChange: (medidas: Record<string, number>) => void;
}

const MedidasForm = ({ medidasEsperadas, valoresIniciales = {}, onChange }: Props) => {
  const [medidas, setMedidas] = useState<Record<string, string>>(() =>
    Object.fromEntries(medidasEsperadas.map(k => [k, valoresIniciales[k]?.toString() || '']))
  );

  useEffect(() => {
    const parsed = Object.fromEntries(
      Object.entries(medidas)
        .filter(([_, val]) => val !== '')
        .map(([k, v]) => [k, parseFloat(v)])
    );
    onChange(parsed);
  }, [medidas]);

  return (
    <div className="space-y-2">
      {medidasEsperadas.map(nombre => (
        <div key={nombre}>
          <label className="block text-sm font-medium text-gray-700">{nombre}</label>
          <input
            type="number"
            step="0.1"
            value={medidas[nombre]}
            onChange={e => setMedidas({ ...medidas, [nombre]: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}
    </div>
  );
};

export default MedidasForm;