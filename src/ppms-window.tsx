import { useRef, useLayoutEffect, Suspense } from "react"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { Stats, OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

type PPMSMeshProps = {
  vertexes: number[][]
  segments: number[][]
  colors: number[] | null | undefined
}

function convertToFloatColors(color: number): number[] {
  return [((color >> 24) & 255) / 255, ((color >> 16) & 255) / 255, ((color >> 8) & 255) / 255, (color & 255) / 255]
}

// TODO: handle errors & make the parser's code cleaner
function PPMSMesh(props: PPMSMeshProps) {
  const mesh = useRef<THREE.LineSegments>(null!)
  useLayoutEffect(() => {
    console.log("useLayoutEffect was called")

    const points: THREE.Vector3[] = []
    const colors: number[] = []
    props.segments.forEach((segment) => {
      if (segment.length < 2) throw `Invalid segment detected: ${JSON.stringify(segment)}`
      for (let i = 1; i < segment.length; i++) {
        if (props.vertexes[segment[i - 1]].length === 3)
          points.push(new THREE.Vector3(...props.vertexes[segment[i - 1]]))
        else if (props.vertexes[segment[i - 1]].length === 2)
          points.push(new THREE.Vector3(...props.vertexes[segment[i - 1]], 0))
        else throw `Invalid vertex detected: ${JSON.stringify(props.vertexes[segment[i - 1]])}`
        if (props.vertexes[segment[i]].length === 3) points.push(new THREE.Vector3(...props.vertexes[segment[i]]))
        else if (props.vertexes[segment[i]].length === 2)
          points.push(new THREE.Vector3(...props.vertexes[segment[i]], 0))
        else throw `Invalid vertex detected: ${JSON.stringify(props.vertexes[segment[i]])}`
      }
      if (props.colors) {
        for (let i = 1; i < segment.length; i++) {
          colors.push(...convertToFloatColors(props.colors[segment[i - 1]]))
          colors.push(...convertToFloatColors(props.colors[segment[i]]))
        }
      } else {
        for (let i = 1; i < segment.length; i++) {
          colors.push(1, 1, 1, 1)
          colors.push(1, 1, 1, 1)
        }
      }
    })
    mesh.current.geometry.setFromPoints(points)
    mesh.current.geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 4))
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
        <Suspense fallback={null}>
          <PPMSMesh
            vertexes={[
              [0, 0, 0],
              [500, 0, 0],
              [0, 500, 0],
            ]}
            segments={[[0, 1, 2, 0]]}
            colors={[0xffff00ff, 0xff00ffff, 0xff0000ff]}
          />
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
