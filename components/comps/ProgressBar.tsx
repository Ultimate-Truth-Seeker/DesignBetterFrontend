// ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      {/* La barra de progreso interior (la parte blanca que se llena) */}
      <div
        className="bg-white h-2.5 rounded-full"
        style={{ width: `${clampedProgress}%` }} 
      ></div>
    </div>
  );
};