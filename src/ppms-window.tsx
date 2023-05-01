import { useRef, useEffect, useState, Suspense } from "react"
import * as THREE from "three"
import { Canvas, LineSegmentsProps } from "@react-three/fiber"
import { Stats, OrbitControls, Grid } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { useControls, folder, buttonGroup } from "leva"
import {
  useDeepCompareEffect,
  useAsync,
  useDropArea,
  useError,
} from "react-use"

//@ts-expect-error (wasmoon 1.13.0 doesn't provide TypeScript types, and we cannot update to newest due to 32-bit number overflow)
import { LuaFactory } from "wasmoon"

interface PPLMeshProps extends LineSegmentsProps {
  vertexes: number[][]
  segments: number[][]
  colors: number[] | null | undefined
}

interface PPLMeshObj {
  vertexes: number[][]
  segments: number[][]
  colors: number[] | null | undefined
}

interface LuaMeshProps extends LineSegmentsProps {
  luaSrc: string
  index: number
}

/**
 * Converts a color from a 32-bit integer/Hexadecimal to a float array.
 * @param color  - The color to convert (in 32-bit integer/Hexadecimal)
 * @returns The color in float array (RGBA)
 */
function convertToFloatColors(color: number): number[] {
  return [
    ((color >> 24) & 255) / 255,
    ((color >> 16) & 255) / 255,
    ((color >> 8) & 255) / 255,
    (color & 255) / 255,
  ]
}

/**
 * Renders a mesh from given vertexes, segments and colors.
 *
 * @param props - The mesh's properties (vertexes, segments, colors and config)
 * @returns The mesh component used by React Three Fiber
 * @todo Handle errors & make the parser's code cleaner
 */
function PPLMesh(props: PPLMeshProps) {
  const mesh = useRef<THREE.LineSegments>(null!)
  const dispatchError = useError()

  useDeepCompareEffect(() => {
    const points: THREE.Vector3[] = []
    const colors: number[] = []

    if (!props.colors)
      console.warn("No colors detected in the mesh. Falling back to white...")
    if (props.colors && props.vertexes.length !== props.colors.length)
      dispatchError(new Error("Invalid color table length"))
    props.segments.forEach(segment => {
      if (segment.length < 2)
        dispatchError(
          new Error(`Invalid segment detected: ${JSON.stringify(segment)}`)
        )
      for (let i = 1; i < segment.length; i++) {
        if (props.vertexes[segment[i - 1]].length === 3)
          points.push(new THREE.Vector3(...props.vertexes[segment[i - 1]]))
        else if (props.vertexes[segment[i - 1]].length === 2)
          points.push(new THREE.Vector3(...props.vertexes[segment[i - 1]], 0))
        else
          dispatchError(
            new Error(
              `Invalid vertex detected: ${JSON.stringify(
                props.vertexes[segment[i - 1]]
              )}`
            )
          )
        if (props.vertexes[segment[i]].length === 3)
          points.push(new THREE.Vector3(...props.vertexes[segment[i]]))
        else if (props.vertexes[segment[i]].length === 2)
          points.push(new THREE.Vector3(...props.vertexes[segment[i]], 0))
        else
          dispatchError(
            new Error(
              `Invalid vertex detected: ${JSON.stringify(
                props.vertexes[segment[i]]
              )}`
            )
          )
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
    mesh.current.geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 4)
    )
    console.log("Computed the mesh")
  }, [props.vertexes, props.segments, props.colors])

  return (
    <lineSegments {...props} ref={mesh}>
      <bufferGeometry />
      <lineBasicMaterial
        linejoin="miter"
        vertexColors={true}
        transparent={true}
      />
    </lineSegments>
  )
}

/**
 * Renders a mesh from a Lua script.
 * @param props - The mesh's properties (Lua script and mesh index)
 * @returns - `<PPLMesh/>` component which renders the mesh from the parsed Lua script using React Three Fiber
 */
function LuaMesh(props: LuaMeshProps) {
  // insert a dummy mesh to prevent errors
  const [pplMesh, setPplMesh] = useState<PPLMeshObj>({
    vertexes: [],
    segments: [],
    colors: [],
  })
  const dispatchError = useError()

  useAsync(async () => {
    const factory = new LuaFactory()

    const lua = await factory.createEngine()
    try {
      // disable potentially dangerous or not supported by PPL libraries from loading (and remove require to replace with js alternative)
      await lua.doString(
        "os = nil io = nil debug = nil crypto = nil coroutine = nil utf8 = nil"
      )

      await lua.doString(props.luaSrc)
      const meshes: PPLMeshObj = lua.global.get("meshes")

      //@ts-ignore
      setPplMesh(meshes[props.index])
      console.log("Parsed the Lua code")
    } catch (err) {
      dispatchError(new Error(`Error while parsing Lua code: ${err}`))
    } finally {
      // Close the lua environment, so it can be freed
      lua.global.close()
    }
  }, [props.luaSrc, props.index])

  return <PPLMesh {...pplMesh} {...props} />
}

const enum Cursor {
  Pan,
  MeshPicker,
  VertexPicker,
}

/**
 * The main window of the PPMS application.
 * @returns The main window of the PPMS application.
 */
function PPMSWindow() {
  const [cursor, setCursor] = useState<Cursor>(Cursor.Pan)
  const { scale, isHidden, mPosition } = useControls(
    {
      Toolbox: { value: "", editable: false, order: -3 },
      Tools: folder(
        {
          Cursor: buttonGroup({
            Pan: () => setCursor(Cursor.Pan),
            MeshPicker: () => setCursor(Cursor.MeshPicker),
            VertexPicker: () => setCursor(Cursor.VertexPicker),
          }),
        },
        { order: -2 }
      ),
      Inspector: folder({
        Mesh: folder({
          mPosition: { value: [0, 0, 0], label: "Position", step: 1 },
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

  // TODO: implement drop area
  const [bond, dropState] = useDropArea({
    onFiles: files => console.log("files", files),
    onUri: uri => console.log("uri", uri),
    onText: text => console.log("text", text),
  })
  return (
    <div className="ppms-window" {...bond}>
      <Canvas camera={{ position: [0, 10, 1000], far: 3000 }}>
        <Suspense fallback={null}>
          <LuaMesh
            luaSrc="meshes = { {vertexes = {{0,0,0}, {500,0,0}, {500,500,0}, {0,500,0}}, colors = {0xffffffff, 0xffff00ff, 0xff00ffff, 0xff0000ff}, segments = {{0,1,2,3,0}}} }"
            index={0}
          />
          <PPLMesh
            vertexes={[
              [0, 0, 0],
              [500, 0, 0],
              [0, 500, 0],
            ]}
            segments={[[0, 1, 2, 0]]}
            colors={[0xffff00ff, 0xff00ffff, 0xff0000ff]}
            scale={scale}
            visible={!isHidden}
            position={mPosition}
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
          sectionThickness={1.5}
          cellThickness={1}
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
