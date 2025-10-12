"use client";

import { useState, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function AvatarModel({ url, scale }: { url: string; scale: [number, number, number] }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} position={[0, -1.5, 0]} />;
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-[400px] text-gray-500">
      Cargando modelo 3D...
    </div>
  );
}

export default function AvatarPage() {
  const [gender, setGender] = useState<"male" | "female">("female");
  const [height, setHeight] = useState(170); // cm
  const [shoulder, setShoulder] = useState(40);
  const [waist, setWaist] = useState(70);
  const [generate, setGenerate] = useState(false);

  const modelUrl = useMemo(
    () => (gender === "female" ? "/female.glb" : "/male.glb"),
    [gender]
  );

  // Calcula escala proporcional
  const scale = useMemo(() => {
    const baseHeight = 170;
    const baseShoulder = 40;
    const baseWaist = 70;

    const heightScale = height / baseHeight;
    const shoulderScale = shoulder / baseShoulder;
    const waistScale = waist / baseWaist;

    return [shoulderScale, heightScale, waistScale] as [number, number, number];
  }, [height, shoulder, waist]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Generador de Avatar 3D para Moda</h1>

      {/* Selector de género */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setGender("female")}
          className={`px-4 py-2 rounded-lg ${
            gender === "female" ? "bg-pink-400 text-white" : "bg-white border"
          }`}
        >
          Femenino
        </button>
        <button
          onClick={() => setGender("male")}
          className={`px-4 py-2 rounded-lg ${
            gender === "male" ? "bg-blue-400 text-white" : "bg-white border"
          }`}
        >
          Masculino
        </button>
      </div>

      {/* Medidas del cuerpo */}
      <div className="grid grid-cols-3 gap-4 mb-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <label className="text-sm mb-1">Altura (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="border rounded-md w-24 p-1 text-center"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-sm mb-1">Hombros (cm)</label>
          <input
            type="number"
            value={shoulder}
            onChange={(e) => setShoulder(Number(e.target.value))}
            className="border rounded-md w-24 p-1 text-center"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="text-sm mb-1">Cintura (cm)</label>
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(Number(e.target.value))}
            className="border rounded-md w-24 p-1 text-center"
          />
        </div>
      </div>

      {/* Botón de generación */}
      <button
        onClick={() => setGenerate(true)}
        className="bg-black text-white px-6 py-2 rounded-lg mb-8"
      >
        Generar Avatar
      </button>

      {/* Vista 3D */}
      {generate && (
        <div className="w-full max-w-2xl h-[500px] bg-white rounded-lg shadow-md">
          <Canvas camera={{ position: [0, 1.5, 3], fov: 45 }}>
            <Suspense fallback={<LoadingFallback />}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 4, 5]} intensity={1} />
              <AvatarModel url={modelUrl} scale={scale} />
              <Environment preset="studio" />
              <OrbitControls enablePan={false} />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
}
