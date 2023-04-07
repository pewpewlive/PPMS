import { useRef, useLayoutEffect, Suspense } from "react"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { Stats, OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

type PPMSMeshProps = {
  vertexes: number[][]
  segments: number[][]
  colors: number[]
}

// TODO: change props type after making a parser
function PPMSMesh(props: any) {
  const mesh = useRef<THREE.LineSegments>(null!)
  useLayoutEffect(() => {
    mesh.current.geometry.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(1000, 0, 0)])
    mesh.current.geometry.setAttribute("color", new THREE.Float32BufferAttribute([1, 0, 1, 1, 1, 0, 1, 1], 4))
    console.log(mesh)
  })
  return (
    <lineSegments ref={mesh}>
      <bufferGeometry />
      <lineBasicMaterial linejoin="miter" vertexColors={true} transparent={true} />
    </lineSegments>
  )
}

function PPMSWindow() {
  return (
    <div className="ppms-window">
      <Canvas camera={{ position: [0, 0, 1000] }}>
        <ambientLight />
        <Suspense fallback={null}>
          <PPMSMesh />
        </Suspense>
        <OrbitControls enableDamping={false} />
        <Stats />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default PPMSWindow
