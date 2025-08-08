'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { GarmentWizard } from '@/components/garment/GarmentWizard';
import { BodyMeasurements } from './Medidas';
import { getPlantillas, Plantilla } from '@/lib/api/clientes';


export function NewPedidoForm({
  onSubmit,
}: {
  onSubmit: (formData: FormData) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [templates, setTemplates] = useState<Plantilla[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const [measurements, setMeasurements] = useState({
    altura: '',
    peso: '',
    pecho: '',
    cintura: '',
    cadera: '',
    busto: '',
    largoFalda: '',
    largoTotal: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getPlantillas();
        setTemplates(data);
      } catch (e:any) {
        console.log(e.message ?? 'Error cargando plantillas');
      } 
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numericValue = parseFloat(value);
    let finalValue = '';
    
    if (!isNaN(numericValue)) {
      finalValue = Math.max(0, numericValue).toString();
    } else if (value === '') {
      finalValue = '';
    }
    
    setMeasurements(prev => ({ ...prev, [name]: finalValue }));
  };

  useEffect(() => {
    const results = templates.filter(template =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTemplates(results);
    setFocusedIndex(-1);
  }, [searchTerm]);

  const handleInputSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSearchTerm('');
    }
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || filteredTemplates.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => 
        prev === filteredTemplates.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => 
        prev <= 0 ? filteredTemplates.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      handleInputSelect(filteredTemplates[focusedIndex].id);
    }
  };

  const handleSelectKeyDown = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <form action={onSubmit} method="post" className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div className="relative">
          <label htmlFor="buscarPlantilla" className="block text-sm font-medium mb-1">
            Buscar plantilla
          </label>
          <Input
            ref={inputRef}
            id="buscarPlantilla"
            placeholder="Buscar plantillas..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={handleKeyDown}
            label={''}
            autoComplete="off"
          />

          {showSuggestions && searchTerm && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredTemplates.map((template, index) => (
                <div
                  key={template.id}
                  onMouseDown={() => handleInputSelect(template.id)}
                  className={`p-2 cursor-pointer text-sm ${
                    index === focusedIndex ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {template.name}
                </div>
              ))}
              {filteredTemplates.length === 0 && (
                <div className="p-2 text-sm text-gray-500">
                  No se encontraron coincidencias
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="plantilla" className="block text-sm font-medium mb-1">
            Seleccionar plantilla
          </label>
          <select
            id="plantilla"
            name="plantilla"
            className="w-full p-2 border rounded-md text-sm"
            required
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            onKeyDown={handleSelectKeyDown}
          >
            <option value="">Selecciona una plantilla</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="titulo" className="block text-sm font-medium mb-1">
            Título del pedido
          </label>
          <Input
            id="titulo"
            name="titulo"
            placeholder="Ej: Diseño para mi prenda"
            //required
            label={''}
          />
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium mb-1">
            Descripción detallada
          </label>
          <Textarea
            id="descripcion"
            name="descripcion"
            rows={6}
            placeholder="Describe en detalle lo que necesitas..."
            //required
          />
        </div>

        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-1">
            Nombre
          </label>
          <div className="flex gap-2">
            <Input
              id="nombre"
              name="nombre"
              placeholder="First Name"
              required
              label={''}
            />
            <Input
              id="apellido"
              name="apellido"
              placeholder="Last Name"
              //required
              label={''}
            />
          </div>
        </div>

        <div>
          <label htmlFor="direccion" className="block text-sm font-medium mb-1">
            Dirección
          </label>
          <Input
            id="direccion"
            name="direccion"
            placeholder="Street Address"
            //required
            label={''}
          />
          <Input
            id="direccion2"
            name="direccion2"
            placeholder="Address Line 2"
            label={''}
          />
          <div className="flex gap-2">
            <Input
              id="ciudad"
              name="ciudad"
              placeholder="City"
              //required
              label={''}
            />
            <Input
              id="estado"
              name="estado"
              placeholder="State/Region/Province"
              //required
              label={''}
            />
          </div>
          <div className="flex gap-2">
            <Input
              id="codigoPostal"
              name="codigoPostal"
              placeholder="Postal / Zip Code"
              //required
              label={''}
            />
            <Input
              id="pais"
              name="pais"
              placeholder="Country"
              //required
              label={''}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Dejar en blanco para usar correo registrado"
            //required
            label={''}
          />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium mb-1">
            Teléfono
          </label>
          <Input
            id="telefono"
            name="telefono"
            type="tel"
            placeholder="Phone"
            //required
            label={''}
          />
        </div>
      </div>

      <div>
        <GarmentWizard/>
        <h2 className="text-lg font-bold mb-4">Medidas corporales</h2>
        <BodyMeasurements measurements={measurements} onChange={handleChange} />
      </div>

      <div className="flex gap-4">
        <Button type="submit">Enviar pedido</Button>
        <Button variant="outline" type="button" asChild>
          <a href="/dashboard/cliente/pedidos">Cancelar</a>
        </Button>
      </div>

    </form>
  );
}

// Componente BodyMeasurements actualizado
function BodyMeasurements({ measurements, onChange }: { measurements: any, onChange: any }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Altura (cm)</label>
          <Input
            type="number"
            name="altura"
            value={measurements.altura}
            onChange={onChange}
            min="0"
            className="border-2 border-white rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500" label={''}          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Peso (kg)</label>
          <Input
            type="number"
            name="peso"
            value={measurements.peso}
            onChange={onChange}
            min="0"
            className="border-2 border-white rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500" label={''}          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pecho (cm)</label>
          <Input
            type="number"
            name="pecho"
            value={measurements.pecho}
            onChange={onChange}
            min="0"
            className="border-2 border-white rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500" label={''}          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cintura (cm)</label>
          <Input
            type="number"
            name="cintura"
            value={measurements.cintura}
            onChange={onChange}
            min="0"
            className="border-2 border-white rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500" label={''}          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cadera (cm)</label>
          <Input
            type="number"
            name="cadera"
            value={measurements.cadera}
            onChange={onChange}
            min="0"
            className="border-2 border-white rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500" label={''}          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Busto (cm)</label>
          <Input
            type="number"
            name="busto"
            value={measurements.busto}
            onChange={onChange}
            min="0"
            className="border-2 border-white rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500" label={''}          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Largo de Falda (cm)</label>
          <Input
            type="number"
            name="largoFalda"
            value={measurements.largoFalda}
            onChange={onChange}
            min="0"
            className="border-2 border-white rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500" label={''}          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Largo Total (cm)</label>
          <Input
            type="number"
            name="largoTotal"
            value={measurements.largoTotal}
            onChange={onChange}
            min="0"
            className="border-2 border-white rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500" label={''}          />
        </div>
      </div>
    </div>
  );
}