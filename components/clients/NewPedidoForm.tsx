'use client';

import { useState, useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { GarmentWizard } from '@/components/garment/GarmentWizard';

const TEMPLATES = [
  { id: 'plantilla1', name: 'Plantilla Básica' },
  { id: 'plantilla2', name: 'Plantilla Premium' },
  { id: 'plantilla3', name: 'Plantilla Personalizada' },
];

export function NewPedidoForm({
  onSubmit,
}: {
  onSubmit: (formData: FormData) => void;
}) {
  const [state, formAction] = useFormState(onSubmit, null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState(TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const results = TEMPLATES.filter(template =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTemplates(results);
    setFocusedIndex(-1);
  }, [searchTerm]);

  const handleInputSelect = (templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
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
    <form action={formAction} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        {/* Campo de búsqueda con sugerencias */}
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

        {/* Lista desplegable tradicional */}
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
            {TEMPLATES.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        {/* Campos restantes del formulario */}
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium mb-1">
            Título del pedido
          </label>
          <Input
            id="titulo"
            name="titulo"
            placeholder="Ej: Diseño para mi prenda"
            required
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
            required
          />
        </div>
      </div>

      <div>
        <GarmentWizard/>
      </div>

      <div className="flex gap-4">
        <Button type="submit">Enviar pedido</Button>
        <Button variant="outline" type="button" asChild>
          <a href="/dashboard/cliente/pedidos">Cancelar</a>
        </Button>
      </div>

      {state?.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}
    </form>
  );
}