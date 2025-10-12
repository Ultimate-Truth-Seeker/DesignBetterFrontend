"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";

const AvatarViewer = dynamic(() => import("./avatarviewer"), { ssr: false });

export default function AvatarPage() {
  const [gender, setGender] = useState<"male" | "female">("female");
  const [height, setHeight] = useState(170);
  const [shoulder, setShoulder] = useState(40);
  const [waist, setWaist] = useState(70);
  const [generate, setGenerate] = useState(false);

  const modelUrl = useMemo(
    () => (gender === "female" ? "/female.glb" : "/male.glb"),
    [gender]
  );

  const scale = useMemo(() => {
    const base = { height: 170, shoulder: 40, waist: 70 };
    return [
      shoulder / base.shoulder,
      height / base.height,
      waist / base.waist,
    ] as [number, number, number];
  }, [height, shoulder, waist]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Generador de Avatar 3D para Moda</h1>

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

      <button
        onClick={() => setGenerate(true)}
        className="bg-black text-white px-6 py-2 rounded-lg mb-8"
      >
        Generar Avatar
      </button>

      {generate && <AvatarViewer url={modelUrl} scale={scale} />}
    </div>
  );
}
