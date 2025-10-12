"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

function AvatarModel({ url, scale }: { url: string; scale: [number, number, number] }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} position={[0, -1.5, 0]} />;
}

export default function AvatarViewer({ url, scale }: { url: string; scale: [number, number, number] }) {
  return (
    <div className="w-full h-[500px] bg-white rounded-lg shadow-md">
      <Canvas camera={{ position: [0, 1.5, 3], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 4, 5]} intensity={1} />
          <AvatarModel url={url} scale={scale} />
          <Environment preset="studio" />
          <OrbitControls enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
