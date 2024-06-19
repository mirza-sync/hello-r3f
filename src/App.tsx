import { Canvas, ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Earth(props: ThreeElements['mesh']) {
  return (
    <mesh
      {...props}
    >
      <icosahedronGeometry args={[1, 12]} />
      <meshStandardMaterial color={'lightblue'} />
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
