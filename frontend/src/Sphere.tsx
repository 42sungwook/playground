import { useFrame, useThree, extend, ReactThreeFiber } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

extend({ OrbitControls })

declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControls: ReactThreeFiber.Object3DNode<
      OrbitControls,
      typeof OrbitControls
    >
  }
}

function Sphere() {
  const sphereRef = useRef<THREE.Mesh>(null)
  const { camera, gl } = useThree()
  console.log(camera, gl)

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.005
      sphereRef.current.rotation.x += 0.005
    }
  })
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="mediumpurple"
          wireframe
        />
      </mesh>
    </>
  )
}

export default Sphere
