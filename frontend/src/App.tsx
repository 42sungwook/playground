import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [sizes, setSizes] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    )
    camera.position.z = 3
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const handleResize = () => {
      setSizes({ width: window.innerWidth, height: window.innerHeight })
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    const animate = () => {
      requestAnimationFrame(animate)

      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [sizes])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ display: 'block' }}
      />
      <style>{`
        body { margin: 0; padding: 0; overflow: hidden; }
      `}</style>
    </>
  )
}

export default App
