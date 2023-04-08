import { useRef, useEffect, Suspense } from "react"
import * as THREE from "three"
import { Canvas, LineSegmentsProps } from "@react-three/fiber"
import { Stats, OrbitControls, Grid } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { useControls, folder, buttonGroup } from "leva"

interface PPLMeshProps extends LineSegmentsProps {
  vertexes: number[][]
  segments: number[][]
  colors: number[] | null | undefined
}

function convertToFloatColors(color: number): number[] {
  return [
    ((color >> 24) & 255) / 255,
    ((color >> 16) & 255) / 255,
    ((color >> 8) & 255) / 255,
    (color & 255) / 255,
  ]
}

// TODO: handle errors & make the parser's code cleaner
function PPLMesh(props: PPLMeshProps) {
  const mesh = useRef<THREE.LineSegments>(null!)
  useEffect(() => {
    console.log("useEffect was called")

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
        if (props.vertexes[segment[i]].length === 3)
          points.push(new THREE.Vector3(...props.vertexes[segment[i]]))
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
  }, [props.vertexes, props.segments, props.colors])
  return (
    <lineSegments {...props} ref={mesh}>
      <bufferGeometry />
      <lineBasicMaterial linejoin="miter" vertexColors={true} transparent={true} />
    </lineSegments>
  )
}

function PPMSWindow() {
  useControls(
    {
      Toolbox: { value: "", editable: false, order: -3 },
      Tools: folder(
        {
          Cursor: buttonGroup({
            Pan: () => console.log("Pan cursor"),
            MeshPicker: () => console.log("Mesh picker cursor"),
            VertexPicker: () => console.log("Vertex picker cursor"),
          }),
        },
        { order: -2 }
      ),
      Inspector: folder({
        Mesh: folder({
          mPosition: { value: [0, 0, 0], label: "Position" },
          scale: { value: 1, label: "Scale" },
          isHidden: { value: false, label: "Hidden" },
        }),
        Vertex: folder({
          vPosition: { value: [0, 0, 0], label: "Position" },
          color: { r: 0, b: 255, g: 255, a: 0.99, label: "Color" },
        }),
      }),
    },
    { order: -1 }
  )

  return (
    <div className="ppms-window">
      <Canvas camera={{ position: [0, 0, 1000], far: 3000 }}>
        <Suspense fallback={null}>
          <PPLMesh
            vertexes={[
              [0, 0, 0],
              [500, 0, 0],
              [0, 500, 0],
            ]}
            segments={[[0, 1, 2, 0]]}
            colors={[0xffff00ff, 0xff00ffff, 0xff0000ff]}
            scale={0.5}
          />
        </Suspense>
        <Grid
          cellColor="#6f6f6f"
          sectionColor="#9d4b4b"
          infiniteGrid={true}
          fadeStrength={1.0}
          fadeDistance={1500}
          args={[1000, 1000]}
          cellSize={50}
          sectionSize={100}
        />
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
