'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Por favor selecciona un archivo .dxf');
      return;
    }

    const formData = new FormData();
    formData.append('name', file.name);
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/auth/upload-dxf/', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('Archivo subido exitosamente.');
      } else {
        const errorData = await res.json();
        setMessage(`Error al subir: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      setMessage(`Error de conexión: ${error}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Subir archivo DXF</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".dxf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Subir
        </button>
      </form>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}