import { Canvas, ThreeElements, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Mesh, TextureLoader } from 'three'
import earthTexture from "./assets/earthmap1k.jpg";
import { useRef } from 'react';

function Earth(props: ThreeElements['mesh']) {
  const meshRef = useRef<Mesh>(null!)
  const earthMap = useLoader(TextureLoader, earthTexture)

  useFrame((_) => meshRef.current.rotation.y += 0.001)

  return (
    <group rotation={[0, 0, (-23.4 * Math.PI / 180)]}>
      <mesh
        {...props}
        ref={meshRef}
      >
        <icosahedronGeometry args={[1, 12]} />
        <meshStandardMaterial map={earthMap} />
      </mesh>
    </group>
  )
}

function App() {
  return (
    <>
      <Canvas>
        <OrbitControls />
        <directionalLight position={[-2, 0.5, 1.5]} />
        <Earth position={[0, 0, 0]} />
      </Canvas>
    </>
  )
}

export default App
