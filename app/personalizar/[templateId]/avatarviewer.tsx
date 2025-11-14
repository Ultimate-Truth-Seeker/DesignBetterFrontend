"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import {
  Physics,
  useRigidBody,
  useSoftBody,
  ShapeType,
  BodyType,
  SoftBodyType,
} from "use-ammojs";
import * as THREE from "three";

type AvatarViewerProps = {
  bodyUrl: string;
  bodyScale: [number, number, number];
  clothingUrl?: string;
  clothingScale?: [number, number, number];
};

// Cuerpo del avatar como rigid body (colisiona con la ropa)
function AvatarBody({ url, scale }: { url: string; scale: [number, number, number] }) {
  const { scene } = useGLTF(url);

  // Collider tipo MESH estático para todo el cuerpo
  useRigidBody(
    () => ({
      bodyType: BodyType.STATIC,
      shapeType: ShapeType.MESH,
    }),
    scene
  );

  return <primitive object={scene} scale={scale} position={[0, -1.5, 0]} />;
}

// Prenda como soft body usando BufferGeometry del GLB
function GarmentSoftBody({
  url,
  scale,
  initialOffset = [0, 0, 0],
}: {
  url: string;
  scale: [number, number, number];
  initialOffset?: [number, number, number];
}) {
  const { scene } = useGLTF(url);

  const { geometry, material } = useMemo(() => {
    let geo: THREE.BufferGeometry | null = null;
    let mat: THREE.Material | null = null;

    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if ((mesh as any).isMesh && mesh.geometry && (mesh.geometry as any).isBufferGeometry) {
        if (!geo) {
          geo = mesh.geometry as THREE.BufferGeometry;
          mat = (mesh.material as THREE.Material) || null;
        }
      }
    });

    return { geometry: geo, material: mat };
  }, [scene]);

  if (!geometry) return null;

  const [ref] = useSoftBody<THREE.Mesh>(() => ({
    type: SoftBodyType.TRIMESH,
    mass: 1,
  }));

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      material={material ?? new THREE.MeshStandardMaterial({ color: "hotpink" })}
      scale={scale}
      position={[initialOffset[0], initialOffset[1], initialOffset[2]]}
      castShadow
      receiveShadow
    />
  );
}

export default function AvatarViewer({
  bodyUrl,
  bodyScale,
  clothingUrl,
  clothingScale = [1, 1, 1],
}: AvatarViewerProps) {
  return (
    <div className="w-full h-[500px] bg-white rounded-lg shadow-md">
      <Canvas camera={{ position: [0, 28.0, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 4, 5]} intensity={1} />

            <AvatarBody url={bodyUrl} scale={bodyScale} />

            {clothingUrl && (
              <GarmentSoftBody
                url={clothingUrl}
                scale={clothingScale}
                initialOffset={[0, 0.5, 0]}
              />
            )}

            <Environment preset="studio" />
            <OrbitControls enablePan={false} />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}