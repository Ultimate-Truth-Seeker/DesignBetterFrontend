import { useEffect, useState } from "react";

export interface ProgressRingProps {
  progress: number; // Valor entre 0 y 100
  size?: number; // Tamaño en píxeles
  strokeWidth?: number; // Grosor de la línea
  trackColor?: string; // Color del track
  progressColor?: string; // Color del progreso
  showLabel?: boolean; // Mostrar porcentaje en el centro
  labelColor?: string; // Color del texto
  className?: string; // Clases adicionales
}

export const ProgressRing = ({
  progress,
  size = 44,
  strokeWidth = 2,
  trackColor = "rgba(19, 20, 20, 0.4)",
  progressColor = "#131414",
  showLabel = false,
  labelColor = "#131414",
  className = ""
}: ProgressRingProps) => {
  // Normalizar el progreso entre 0 y 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Radio y circunferencia calculados
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  // Offset para la animación
  const offset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={normalizedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90" // Rotar para empezar desde arriba
      >
        {/* Track (fondo) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress (barra de progreso) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-300 ease-out"
        />
      </svg>

      {/* Etiqueta de porcentaje */}
      {showLabel && (
        <span 
          className="absolute text-xs font-medium"
          style={{ color: labelColor }}
        >
          {Math.round(normalizedProgress)}%
        </span>
      )}
    </div>
  );
};

// Componente que muestra múltiples variantes (para demostración)
export const ProgressRingShowcase = () => {
  const [progress, setProgress] = useState(0);

  // Efecto para animar el progreso (solo para demostración)
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 1), 50);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Anillos de Progreso</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Variante 0% */}
        <div className="flex flex-col items-center">
          <ProgressRing progress={0} />
          <span className="mt-2 text-sm text-gray-600">0%</span>
        </div>
        
        {/* Variante 25% */}
        <div className="flex flex-col items-center">
          <ProgressRing progress={25} />
          <span className="mt-2 text-sm text-gray-600">25%</span>
        </div>
        
        {/* Variante 50% */}
        <div className="flex flex-col items-center">
          <ProgressRing progress={50} />
          <span className="mt-2 text-sm text-gray-600">50%</span>
        </div>
        
        {/* Variante 75% */}
        <div className="flex flex-col items-center">
          <ProgressRing progress={75} />
          <span className="mt-2 text-sm text-gray-600">75%</span>
        </div>
        
        {/* Variante 100% */}
        <div className="flex flex-col items-center">
          <ProgressRing progress={100} />
          <span className="mt-2 text-sm text-gray-600">100%</span>
        </div>
        
        {/* Variante con etiqueta */}
        <div className="flex flex-col items-center">
          <ProgressRing progress={42} showLabel={true} />
          <span className="mt-2 text-sm text-gray-600">Con etiqueta</span>
        </div>
        
        {/* Variante de tamaño diferente */}
        <div className="flex flex-col items-center">
          <ProgressRing progress={65} size={60} strokeWidth={3} />
          <span className="mt-2 text-sm text-gray-600">Tamaño grande</span>
        </div>
        
        {/* Variante con colores personalizados */}
        <div className="flex flex-col items-center">
          <ProgressRing 
            progress={85} 
            trackColor="rgba(79, 70, 229, 0.2)" 
            progressColor="#4f46e5" 
            labelColor="#4f46e5"
            showLabel={true}
          />
          <span className="mt-2 text-sm text-gray-600">Colores personalizados</span>
        </div>
      </div>
      
      {/* Anillo animado para demostración */}
      <div className="flex flex-col items-center mt-8">
        <h3 className="text-lg font-semibold mb-4">Anillo de progreso animado</h3>
        <ProgressRing 
          progress={progress} 
          size={80} 
          strokeWidth={4}
          showLabel={true}
          progressColor="#7B61FF"
          trackColor="rgba(123, 97, 255, 0.2)"
        />
        <button 
          onClick={() => setProgress(0)}
          className="mt-4 px-4 py-2 bg-[#7B61FF] text-white rounded hover:bg-[#6b51e0] transition-colors"
        >
          Reiniciar animación
        </button>
      </div>
    </div>
  );
};