import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function Sphere() {
  const cubeRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.005
      cubeRef.current.rotation.x += 0.005
    }
  })
  return (
    <>
      <mesh ref={cubeRef}>
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
