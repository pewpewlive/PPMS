import { useEffect, useRef } from "react"
import {
  GizmoHelper, GizmoViewport,
  Grid,
  OrbitControls,
  Point,
  PointMaterial,
  Points,
  Segment,
  SegmentObject,
  Segments,
  TransformControls,
} from "@react-three/drei"
import { Object3D } from "three"
import { Canvas } from "@react-three/fiber"
import { useMeshStore } from "../Meshes/Mesh"
import { selectedVertexStore } from "../EditorState"
export default function Renderer(){
  
  const segmentRef = useRef<SegmentObject[]>([])
  const pointRef = useRef<Object3D[]>([])
  const mesh = useMeshStore(state => state.mesh)
  const [setSelectedVertex] = selectedVertexStore((state) => [state.setSelectedVertex])

  useEffect(() => {
    mesh?.segments.forEach((segment, index) => {
      segmentRef.current[index]?.start?.set(
        mesh?.vertices[segment.indices[0]].position.x,
        mesh?.vertices[segment.indices[0]].position.y,
        mesh?.vertices[segment.indices[0]].position.z
      )
      segmentRef.current[index]?.end?.set(
        mesh?.vertices[segment.indices[1]].position.x,
        mesh?.vertices[segment.indices[1]].position.y,
        mesh?.vertices[segment.indices[1]].position.z
      )
    })
    mesh?.vertices.forEach((vertex, index) => {
      pointRef.current[index]?.position.set(
        vertex.position.x,
        vertex.position.y,
        vertex.position.z
      )
    })
  }, [mesh])
  return (<Canvas camera={{ position: [0, 0, 1000], far: 3000 }}>
    <color attach="background" args={["#000000"]} />
    <TransformControls mode="translate">
      <group>
        {/* TODO: Use ref instead of segment components */}
        <Segments limit={1000} lineWidth={1.0}>
          {mesh?.segments.map((segment, index) => (
            <Segment
              ref={r => {
                if (r) segmentRef.current[index] = r
              }}
              start={mesh?.vertices[segment.indices[0]].position}
              end={mesh?.vertices[segment.indices[1]].position}
              color={mesh?.vertices[segment.indices[0]].color}
              key={index}
            />
          ))}
        </Segments>
        {/* TODO: Implement instanced selection */}
        <Points>
          <PointMaterial
            transparent
            vertexColors
            size={7.5}
            sizeAttenuation={false}
            depthWrite={false}
          />
          {mesh?.segments.map((segment, index) => (
            <Point
              ref={(r:Object3D) => {
                if (r) pointRef.current[index] = r
              }}
              position={mesh?.vertices[segment.indices[0]].position}
              color="white"
              onClick={() => setSelectedVertex(index)}
              key={index}
            />
          ))}
        </Points>
      </group>
    </TransformControls>

    <Grid
      cellColor="#6f6f6f"
      sectionColor="#9d4b4b"
      infiniteGrid
      fadeStrength={1.0}
      fadeDistance={1500}
      args={[1000, 1000]}
      cellSize={50}
      sectionSize={100}
      sectionThickness={1.5}
      cellThickness={1}
    />
    <OrbitControls enableDamping={false} makeDefault />
    {/* <Stats /> */}
    <GizmoHelper
      alignment="bottom-right" // widget alignment within scene
      margin={[80, 80]} // widget margins (X, Y)
    >
      <GizmoViewport
        axisColors={["red", "green", "blue"]}
        labelColor="black"
      />
    </GizmoHelper>
    {/* TODO: implement selective bloom
            <EffectComposer>
              <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} />
            </EffectComposer> */}
  </Canvas>)
}