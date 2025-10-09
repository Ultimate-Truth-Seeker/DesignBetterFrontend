"use client"

import React, { Suspense, useMemo, useState } from 'react'
// @ts-ignore - no type declarations for next/dynamic in this environment
import dynamic from 'next/dynamic'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'

// --- Carga diferida del Canvas SOLO en cliente ---
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

// Fallback mientras carga el modelo
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-96 text-sm text-gray-500 dark:text-gray-400">
      Cargando modelo 3D...
    </div>
  )
}

// Componente para mostrar un modelo GLB
function GLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return (
    <group position={[0, -1, 0]} scale={1.5}>
      <primitive object={scene} />
    </group>
  )
}

// Convierte el nombre del archivo en una etiqueta más legible
function labelFromFilename(name: string) {
  return name.replace('.glb', '').replaceAll('_', ' ')
}

export default function ModelsPage() {
  // Archivos dentro de /public/models/
  const modelEntries = useMemo(
    () => [
      ['Camisa.glb', '/models/Camisa.glb'],
      ['Formal_Dress.glb', '/models/Formal_Dress.glb'],
      ['Jacket.glb', '/models/Jacket.glb'],
      ['macbook_laptop.glb', '/models/macbook_laptop.glb'],
      ['short.glb', '/models/short.glb'],
      ['top.glb', '/models/top.glb'],
    ],
    []
  )

  const [selected, setSelected] = useState<string>(modelEntries[0]?.[0] ?? '')

  const modelUrl = useMemo(() => {
    const found = modelEntries.find(([name]) => name === selected)
    return found ? found[1] : ''
  }, [selected, modelEntries])

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Visor de Modelos 3D (.glb)</h1>

      {/* Selector de modelo */}
      <div className="flex flex-wrap gap-2">
        {modelEntries.map(([name]) => (
          <button
            key={name}
            onClick={() => setSelected(name)}
            className={`px-3 py-1 rounded border text-sm ${
              selected === name
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-neutral-800'
            }`}
          >
            {labelFromFilename(name)}
          </button>
        ))}
      </div>

      {/* Lienzo 3D */}
      <div className="w-full h-[70vh] rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        {modelUrl ? (
          <Canvas camera={{ position: [0, 1, 4] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Suspense fallback={<LoadingFallback />}>
              <GLBModel url={modelUrl} />
              <Environment preset="studio" />
            </Suspense>
            <OrbitControls enablePan enableZoom enableRotate />
          </Canvas>
        ) : (
          <LoadingFallback />
        )}
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        Consejo: haz zoom con la rueda del ratón, arrastra para rotar y Alt+drag para desplazar.
      </div>
    </div>
  )
}

// Preload opcional
useGLTF.preload('/models/macbook_laptop.glb')
