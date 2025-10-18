'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MedidasForm from '@/components/designer/MedidasForm';




import { generarGeometria } from '@/components/designer/generarGeometria';
import Navbar from '@/components/DashNavbar';
import { DesignerNavbar } from '@/components/designer/DesignerNavbar';
import { useAuth } from '@/components/AuthProvider';
import { getAccessToken } from '@/lib/auth-client';

interface Medidas {
  [key: string]: number;
}

interface PartePatron {
  nombre_parte: string;
  medidas: Medidas;
  observaciones?: string;
}

interface PatronFormData {
  nombre: string;
  tipo_prenda: string;
  genero: string;
  tallas_disponibles: string[];
  observaciones?: string;
  archivo_patron: File | null;
  partes: PartePatron[];
  materiales: number[];
}

export default function IngresoPatronesPage() {
  const router = useRouter();
  const medidasEsperadas = ['largo', 'ancho', 'cintura']; 
  const [formData, setFormData] = useState<PatronFormData>({
  
    nombre: '',
    tipo_prenda: 'camisa',
    genero: 'unisex',
    tallas_disponibles: [],
    observaciones: '',
    archivo_patron: null,
    partes: [{ nombre_parte: '', medidas: {}, observaciones: '', geometria: [] }],
    materiales: []
  });

  // Opciones para selects
  const tiposPrenda = ['camisa', 'pantalon', 'vestido', 'chaqueta'];
  const generos = ['masculino', 'femenino', 'unisex'];
  const tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev: any) => ({ ...prev, archivo_patron: e.target.files![0] }));
    }
  };

  const handleTallaChange = (talla: string) => {
    setFormData((prev: { tallas_disponibles: string[]; }) => ({
      ...prev,
      tallas_disponibles: prev.tallas_disponibles.includes(talla)
        ? prev.tallas_disponibles.filter((t: string) => t !== talla)
        : [...prev.tallas_disponibles, talla]
    }));
  };

  const handleParteChange = (index: number, field: keyof PartePatron, value: string | Medidas) => {
    const nuevasPartes = [...formData.partes];
    nuevasPartes[index] = { ...nuevasPartes[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, partes: nuevasPartes }));
  };
  const handleParteMedidasChange = (index: number, medidas: Record<string, number>) => {
    const nuevasPartes = [...formData.partes];
    nuevasPartes[index].medidas = medidas;

    // Generar nueva geometría
    nuevasPartes[index].geometria = generarGeometria(medidas);

    setFormData((prev: any) => ({ ...prev, partes: nuevasPartes }));
  };

  const addParte = () => {
    setFormData((prev: { partes: any; }) => ({
      ...prev,
      partes: [...prev.partes, { nombre_parte: '', medidas: {}, observaciones: '' }]
    }));
  };

  const removeParte = (index: number) => {
    setFormData((prev: { partes: any[]; }) => ({
      ...prev,
      partes: prev.partes.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = getAccessToken()
    

    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('tipo_prenda', formData.tipo_prenda);
    formDataToSend.append('genero', formData.genero);
    formDataToSend.append('tallas_disponibles', JSON.stringify(formData.tallas_disponibles));
    
    if (formData.observaciones) {
      formDataToSend.append('observaciones', formData.observaciones);
    }
    
    if (formData.archivo_patron) {
      formDataToSend.append('archivo_patron', formData.archivo_patron);
    }

    
    formDataToSend.append('partes', JSON.stringify(formData.partes));
    
    
    //console.log("Contenido:", JSON.stringify(formData.partes))//DEBUG

    try {
      const response = await fetch('http://localhost:8000/auth/crear-patron/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        alert('Patrón creado exitosamente');
        //router.push('/patrones');
        setFormData({
  
    nombre: '',
    tipo_prenda: 'camisa',
    genero: 'unisex',
    tallas_disponibles: [],
    observaciones: '',
    archivo_patron: null,
    partes: [{ nombre_parte: '', medidas: {}, observaciones: '', geometria: [] }],
    materiales: []
  })
      } else {
        const errorData = await response.json();
        alert(`Error: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el formulario');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <DesignerNavbar/>
      <h1 className="text-2xl font-bold mb-6">Ingreso de Nuevo Patrón</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Sección de información básica */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Información General</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre del Patrón *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Tipo de Prenda */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tipo de Prenda *
              </label>
              <select
                name="tipo_prenda"
                value={formData.tipo_prenda}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {tiposPrenda.map(tipo => (
                  <option key={tipo} value={tipo}>
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Género */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Género *
              </label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {generos.map(genero => (
                  <option key={genero} value={genero}>
                    {genero.charAt(0).toUpperCase() + genero.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Tallas Disponibles */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tallas Disponibles *
              </label>
              <div className="flex flex-wrap gap-2">
                {tallas.map(talla => (
                  <label key={talla} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.tallas_disponibles.includes(talla)}
                      onChange={() => handleTallaChange(talla)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">{talla}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Archivo del Patrón */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Archivo del Patrón (PDF/DXF) *
            </label>
            <input
              type="file"
              accept=".pdf,.dxf"
              onChange={handleFileChange}
              required
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {/* Observaciones */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows={3}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* Sección de Partes del Patrón */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Partes del Patrón</h2>
          
          {formData.partes.map((parte: {
            geometria: any; nombre_parte: any; medidas: any; observaciones: any; 
}, index: number) => (
            <div key={index} className="border border-gray-200 rounded p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                {/* Nombre de la Parte */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre de la Parte *
                  </label>
                  <input
                    type="text"
                    value={parte.nombre_parte}
                    onChange={(e: { target: { value: string | Medidas; }; }) => handleParteChange(index, 'nombre_parte', e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                {/* Medidas */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Medidas *
                  </label>
                  <MedidasForm
                    medidasEsperadas={medidasEsperadas}
                    valoresIniciales={parte.medidas}
                    onChange={(nuevasMedidas) => handleParteMedidasChange(index, nuevasMedidas)}
                  />
                </div>
                
              </div>

              {/* Observaciones de la Parte */}
              <div className="mb-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Observaciones
                </label>
                <textarea
                  value={parte.observaciones || ''}
                  onChange={(e: { target: { value: string | Medidas; }; }) => handleParteChange(index, 'observaciones', e.target.value)}
                  rows={2}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {/* Editor visual de geometría */}
              <div className="mt-2 border p-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Vista previa:</label>
                <svg width="300" height="300" viewBox="0 0 300 300">
                  {Array.isArray(parte.geometria) &&
                    parte.geometria.map((el, i) => {
                      if (el.tipo === "polyline") {
                        const puntos = el.puntos.map(([x, y]: [number, number]) => `${x},${300 - y}`).join(" ");
                        return <polyline key={i} points={puntos} stroke={el.color || "black"} fill="none" />;
                      }
                      return null;
                    })}
                </svg>
              </div>

              {formData.partes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeParte(index)}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm"
                >
                  Eliminar Parte
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addParte}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded"
          >
            + Añadir Parte
          </button>
        </div>

        {/* Botón de Envío */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Patrón
          </button>
        </div>
      </form>
    </div>
  );
}