'use client';
import React, { useEffect, useState } from 'react';

interface Props {
  medidasEsperadas: string[]; 
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

  const handleChange = (nombre: string, value: string) => {
    let cleanedValue = value.replace(/[^0-9.]/g, '');
    
    const parts = cleanedValue.split('.');
    if (parts.length > 2) {
      cleanedValue = `${parts[0]}.${parts[1]}`;
    }
    
    const numericValue = parseFloat(cleanedValue);
    if (!isNaN(numericValue)) {
      if (numericValue < 0) cleanedValue = '0';
    }
    
    setMedidas(prev => ({
      ...prev,
      [nombre]: cleanedValue
    }));
  };

  return (
    <div className="space-y-2">
      {medidasEsperadas.map(nombre => (
        <div key={nombre}>
          <label className="block text-sm font-medium text-gray-700">
            {nombre} (cm) 
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={medidas[nombre]}
            onChange={e => handleChange(nombre, e.target.value)}
            onKeyDown={(e) => {
              if (!/[0-9\.]|Backspace|Delete|Arrow/.test(e.key)) {
                e.preventDefault();
              }
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}
    </div>
  );
};

export default MedidasForm;