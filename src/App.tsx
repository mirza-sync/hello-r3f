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
    <mesh
      {...props}
      ref={meshRef}
    >
      <icosahedronGeometry args={[1, 12]} />
      <meshStandardMaterial map={earthMap} />
    </mesh>
  )
}

function App() {
  return (
    <>
      <Canvas>
        <OrbitControls />
        <hemisphereLight args={['#ffffff', '#000000', 0.5]} />
        <Earth position={[0, 0, 0]} />
      </Canvas>
    </>
  )
}

export default App
