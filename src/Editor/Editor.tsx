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
} from "@fluentui/react-components"

import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerInline,
} from "@fluentui/react-components/unstable"

import { useRoute } from "wouter"

import EditorToolbar from "./Toolbar"
import { useState } from "react"
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

import { EffectComposer, Bloom } from "@react-three/postprocessing"

import TreeViewDrawer from "./Drawers/TreeView"

const useStyles = makeStyles({
  root: {
    ...shorthands.overflow("hidden"),
    display: "flex",
    height: "90vh",
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

interface Props {
  color: string
  label: string
}

function ValueField(props: Props) {
  const styles = useStyles()

  return (
    <div
      className={styles.valueField}
      style={{ backgroundColor: props.color, borderRadius: "4.6px" }}
    >
      <Body1Stronger>{props.label}</Body1Stronger>
      <SpinButton appearance="filled-darker" size="small" />
    </div>
  )
}

function Editor() {
  const styles = useStyles()
  const [match, params] = useRoute("/editor/:projectName")
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)

  return (
    <div>
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
                  <Segment start={[0, 0, 0]} end={[0, 200, 0]} color="red" />
                  <Segment
                    start={[0, 0, 0]}
                    end={[0, 200, 200]}
                    color={[1, 0, 1]}
                  />
                  <Segment
                    start={[0, 0, 0]}
                    end={[0, 200, -200]}
                    color={[1, 1, 0]}
                  />
                  <Segment
                    start={[0, 0, 0]}
                    end={[200, 200, 0]}
                    color={[0, 1, 0]}
                  />
                  <Segment
                    start={[0, 0, 0]}
                    end={[-200, 200, 0]}
                    color={[0, 1, 1]}
                  />
                </Segments>
                <Points>
                  <PointMaterial
                    transparent
                    vertexColors
                    size={7.5}
                    sizeAttenuation={false}
                    depthWrite={false}
                  />
                  <Point
                    position={[0, 200, 0]}
                    color="white"
                    onClick={() => console.log("Vertex selected")}
                  />
                  <Point
                    position={[0, 0, 0]}
                    color="white"
                    onClick={() => console.log("Vertex selected")}
                  />
                  <Point
                    position={[0, 200, 200]}
                    color="white"
                    onClick={() => console.log("Vertex selected")}
                  />
                  <Point
                    position={[0, 200, -200]}
                    color="white"
                    onClick={() => console.log("Vertex selected")}
                  />
                  <Point
                    position={[200, 200, 0]}
                    color="white"
                    onClick={() => console.log("Vertex selected")}
                  />
                  <Point
                    position={[-200, 200, 0]}
                    color="white"
                    onClick={() => console.log("Vertex selected")}
                  />
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
            <Stats />
            <GizmoHelper
              alignment="bottom-right" // widget alignment within scene
              margin={[80, 80]} // widget margins (X, Y)
            >
              <GizmoViewport
                axisColors={["red", "green", "blue"]}
                labelColor="black"
              />
            </GizmoHelper>
            {/* TODO: implement selective bloom */}
            {/*<EffectComposer>
              <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} />
            </EffectComposer>*/}
          </Canvas>
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
                />
                <ValueField
                  color={tokens.colorPaletteLightGreenBackground3}
                  label="Y"
                />
                <ValueField
                  color={tokens.colorCompoundBrandStrokePressed}
                  label="Z"
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
