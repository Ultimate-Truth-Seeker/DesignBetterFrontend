import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense } from 'react'

function TestModel() {
  const { scene } = useGLTF('/components/3DRender/macbook_laptop.glb')
  return <primitive object={scene} scale={0.5} />
}

function LoadingFallback() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%' 
    }}>
      Loading 3D Model...
    </div>
  )
}

export default function RenderTest() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <TestModel />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}

// package.json dependencies to install:
// npm install three @react-three/fiber @react-three/drei zustand