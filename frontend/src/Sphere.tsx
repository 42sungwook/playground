import { useFrame, useThree, extend, ReactThreeFiber } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera } from '@react-three/drei'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

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
  const sphereRef = useRef<THREE.Mesh>(null!)
  const { camera, gl } = useThree()
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.key.toLowerCase()]: true }))
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.key.toLowerCase()]: false }))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((_state, delta) => {
    const speed = 10
    const rotationSpeed = 3

    if (keys['w'] || keys['arrowup']) {
      sphereRef.current.position.z -= speed * delta
      sphereRef.current.rotation.x -= rotationSpeed * delta
    }
    if (keys['s'] || keys['arrowdown']) {
      sphereRef.current.position.z += speed * delta
      sphereRef.current.rotation.x += rotationSpeed * delta
    }
    if (keys['a'] || keys['arrowleft']) {
      sphereRef.current.position.x -= speed * delta
      sphereRef.current.rotation.z -= rotationSpeed * delta
    }
    if (keys['d'] || keys['arrowright']) {
      sphereRef.current.position.x += speed * delta
      sphereRef.current.rotation.z += rotationSpeed * delta
    }
  })

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight
        position={[-10, 50, 0]}
        intensity={2.5}
      />
      <ambientLight intensity={0.5} />
      <PerspectiveCamera
        makeDefault
        position={[4, 46, 22]}
        rotation={[0.44, -0.13, 0.06]}
      />
      <mesh
        ref={sphereRef}
        position={[0, 0, 2]}
      >
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#37dec9"
          wireframe
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#8c584d" />
      </mesh>
    </>
  )
}

export default Sphere
