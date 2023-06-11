import {
  makeStyles,
  shorthands,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Tab,
  TabList,
  Divider,
  SpinButton,
  Field,
  tokens,
  Subtitle1,
  Body1Stronger,
  SpinButtonProps,
  SpinButtonChangeEvent,
  SpinButtonOnChangeData,
} from "@fluentui/react-components"

import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerInline,
} from "@fluentui/react-components/unstable"

import { useRoute } from "wouter"

import { useCallback, useState } from "react"
import BottomEditorToolbar from "./Toolbars/BottomToolbar"
import EditorToolbar from "./Toolbar"
import { Canvas } from "@react-three/fiber"
import {
  Stats,
  OrbitControls,
  Grid,
  Segments,
  Segment,
  GizmoHelper,
  GizmoViewport,
  TransformControls,
  Point,
  Points,
  PointMaterial,
} from "@react-three/drei"

import { Color, Vector3 } from "three"

import { EffectComposer, Bloom } from "@react-three/postprocessing"

import TreeViewDrawer from "./Drawers/TreeView"
import { Mesh, Vertex, MeshSegment } from "./Meshes/Mesh"

const useStyles = makeStyles({
  root: {
    ...shorthands.overflow("hidden"),
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  content: {
    ...shorthands.flex(1),
    ...shorthands.padding("16px"),
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  renderingCanvas: {
    ...shorthands.flex(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minWidth: "10px",
    position: "relative",
  },
  inspectorDivider: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  multiValueField: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: "0.5rem",
    rowGap: "0.5rem",
  },
  valueField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "5px",
    paddingLeft: "5px",
    width: "80px",
  },
})

interface ValueFieldProps {
  color: string
  label: string
  value: number
}

function ValueField(props: ValueFieldProps) {
  const styles = useStyles()

  return (
    <div
      className={styles.valueField}
      style={{ backgroundColor: props.color, borderRadius: "4.6px" }}
    >
      <Body1Stronger>{props.label}</Body1Stronger>
      <SpinButton appearance="filled-darker" size="small" value={props.value} />
    </div>
  )
}

function Editor() {
  const styles = useStyles()
  const [match, params] = useRoute("/editor/:projectName")
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [mesh, setMesh] = useState<Mesh>(
    new Mesh(
      [
        new Vertex(new Vector3(0, 0, 0), new Color(1, 1, 1)),
        new Vertex(new Vector3(100, 0, 0), new Color(1, 1, 1)),
        new Vertex(new Vector3(100, 100, 0), new Color(1, 1, 1)),
        new Vertex(new Vector3(0, 100, 0), new Color(1, 1, 1)),
      ],
      [
        new MeshSegment([0, 1]),
        new MeshSegment([1, 2]),
        new MeshSegment([2, 3]),
        new MeshSegment([3, 0]),
      ]
    )
  )
  const [selectedVertex, setSelectedVertex] = useState<number>(0)

  return (
    <div style={{height: "100vh",display:"flex",flexDirection:"column"}}>
      <EditorToolbar
        isDrawerOpen={isDrawerOpen}
        clickCallback={value => setDrawerOpen(value)}
      />
      <div className={styles.root}>
        <TreeViewDrawer
          isDrawerOpen={isDrawerOpen}
          clickCallback={value => setDrawerOpen(value)}
        />

        <div className={styles.renderingCanvas}>
          <Canvas camera={{ position: [0, 0, 1000], far: 3000 }}>
            <color attach="background" args={["#000000"]} />
            <TransformControls mode="translate">
              <group>
                <Segments limit={1000} lineWidth={1.0}>
                  {mesh?.segments.map((segment, index) => (
                    <Segment
                      start={mesh?.vertexes[segment.indexes[0]].position}
                      end={mesh?.vertexes[segment.indexes[1]].position}
                      color={mesh?.vertexes[segment.indexes[0]].color}
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
                      position={mesh?.vertexes[segment.indexes[0]].position}
                      color="white"
                      onClick={() => setSelectedVertex(index)}
                    />
                  ))}
                </Points>
              </group>
            </TransformControls>

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
          </Canvas>
          <BottomEditorToolbar />
        </div>

        <DrawerInline separator position="right" open>
          <DrawerHeader>
            <DrawerHeaderTitle>Inspector</DrawerHeaderTitle>
          </DrawerHeader>

          <DrawerBody>
            <Accordion collapsible>
              <AccordionItem value="1">
                <AccordionHeader size="large">Meshes</AccordionHeader>
                <AccordionPanel>
                  <div>
                    <TabList defaultSelectedValue="mesh0" vertical>
                      <Tab value="mesh0">Mesh 1</Tab>
                      <Tab value="mesh1">Mesh 2</Tab>
                      <Tab value="mesh2">Mesh 3</Tab>
                      <Tab value="mesh3">Mesh 4</Tab>
                    </TabList>
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Divider className={styles.inspectorDivider} />

            <Subtitle1>Vertex</Subtitle1>
            <Field label="Position">
              <div className={styles.multiValueField}>
                {/*<Field label="X" size="large">
                  <SpinButton defaultValue={10} />
                </Field>
                <Field label="Y" size="large">
                  <SpinButton defaultValue={10} />
                </Field>
                <Field label="Z" size="large">
                  <SpinButton defaultValue={10} />
                </Field>*/}
                <ValueField
                  color={tokens.colorPaletteRedBackground3}
                  label="X"
                  value={mesh?.vertexes[selectedVertex].position.x}
                />
                <ValueField
                  color={tokens.colorPaletteLightGreenBackground3}
                  label="Y"
                  value={mesh?.vertexes[selectedVertex].position.y}
                />
                <ValueField
                  color={tokens.colorCompoundBrandStrokePressed}
                  label="Z"
                  value={mesh?.vertexes[selectedVertex].position.z}
                />
              </div>
            </Field>
          </DrawerBody>
        </DrawerInline>
      </div>
    </div>
  )
}

export default Editor
