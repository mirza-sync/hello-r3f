import * as THREE from 'three'
import { Canvas, MeshProps, ThreeElements, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, useHelper } from '@react-three/drei'
import { Mesh, TextureLoader } from 'three'
import earthTexture from "./assets/earthmap1k.jpg";
import earthLights from "./assets/earthlights1k.jpg";
import cloudsTexture from "./assets/earthcloudmap.jpg";
import React, { useRef } from 'react';
import { getFresnelMat } from './utils/getFresnelMat';
import getStarfield from './utils/getStarField';

function Sphere() {
  return <icosahedronGeometry args={[1, 12]} />
}

const SphereMesh = React.forwardRef((
  props: MeshProps,
  ref: React.Ref<Mesh>,
) => {
  return (
    <mesh
      {...props}
      ref={ref}
    >
      {props.children}
    </mesh>
  )
})

function GlowMat() {
  return getFresnelMat()
}

function Earth(props: ThreeElements['mesh']) {
  const earthMeshRef = useRef<Mesh>(null!)
  const lightsMeshRef = useRef<Mesh>(null!)
  const cloudsMeshRef = useRef<Mesh>(null!)
  const glowMeshRef = useRef<Mesh>(null!)
  const earthMap = useLoader(TextureLoader, earthTexture)
  const lightsMat = useLoader(TextureLoader, earthLights)
  const cloudsMat = useLoader(TextureLoader, cloudsTexture)

  useFrame((_) => {
    earthMeshRef.current.rotation.y += 0.001
    lightsMeshRef.current.rotation.y += 0.001
    cloudsMeshRef.current.rotation.y += 0.002
    glowMeshRef.current.rotation.y += 0.001
  })

  return (
    <group rotation={[0, 0, (-23.4 * Math.PI / 180)]}>
      <SphereMesh
        {...props}
        ref={earthMeshRef}
      >
        <Sphere />
        <meshStandardMaterial map={earthMap} />
      </SphereMesh>
      <SphereMesh
        {...props}
        ref={lightsMeshRef}
      >
        <Sphere />
        <meshBasicMaterial map={lightsMat} blending={THREE.AdditiveBlending} />
      </SphereMesh>
      <SphereMesh
        {...props}
        ref={cloudsMeshRef}
        scale={1.002}
      >
        <Sphere />
        <meshStandardMaterial map={cloudsMat} blending={THREE.AdditiveBlending} transparent opacity={0.8} />
      </SphereMesh>
      <SphereMesh
        {...props}
        ref={glowMeshRef}
        scale={1.01}
      >
        <Sphere />
        <GlowMat />
      </SphereMesh>
    </group>
  )
}

function SunLight() {
  const dirLightRef = useRef<THREE.DirectionalLight>(null!)
  useHelper(dirLightRef, THREE.DirectionalLightHelper)

  return (
    <>
      <directionalLight
        args={[0xffffff, 2]}
        position={[-2, 0.5, 1.5]}
      // ref={dirLightRef}
      />
    </>
  )
}

function App() {
  return (
    <>
      <Canvas>
        <OrbitControls />
        <SunLight />
        <Earth position={[0, 0, 0]} />
        {getStarfield({ numStars: 5000 })}
      </Canvas>
    </>
  )
}

export default App
