import { SetStateAction, useCallback, useEffect, useState } from "react"
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerInline,
} from "@fluentui/react-components/unstable"
import {
  makeStyles,
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
import { useMeshStore } from "../Meshes/Mesh"
import { selectedVertexStore } from "../EditorState"
const useStyles = makeStyles({
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
  onChange: SpinButtonProps["onChange"]
}

function ValueField(props: ValueFieldProps) {
  const styles = useStyles()

  return (
    <div
      className={styles.valueField}
      style={{ backgroundColor: props.color, borderRadius: "4.6px" }}
    >
      <Body1Stronger>{props.label}</Body1Stronger>
      <SpinButton
        appearance="filled-darker"
        size="small"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}
const VertexField = () => {
  const styles = useStyles()
  const [mesh, setVertexPosX, setVertexPosY, setVertexPosZ] = useMeshStore(
    state => [
      state.mesh,
      state.setVertexPosX,
      state.setVertexPosY,
      state.setVertexPosZ,
    ]
  )
  const [selectedVertex] = selectedVertexStore(state => [state.selectedVertex])
  const [x, setX] = useState(mesh?.vertices[selectedVertex].position.x)
  const [y, setY] = useState(mesh?.vertices[selectedVertex].position.y)
  const [z, setZ] = useState(mesh?.vertices[selectedVertex].position.z)
  useEffect(() => {
    setX(mesh?.vertices[selectedVertex].position.x)
    setY(mesh?.vertices[selectedVertex].position.y)
    setZ(mesh?.vertices[selectedVertex].position.z)
    console.log(
      mesh?.vertices[selectedVertex].position.x,
      mesh?.vertices[selectedVertex].position.y,
      mesh?.vertices[selectedVertex].position.z
    )
  }, [selectedVertex])
  useEffect(() => {
    setVertexPosX(selectedVertex, x)
    setVertexPosY(selectedVertex, y)
    setVertexPosZ(selectedVertex, z)
  }, [x, y, z])
  const onChangeX: SpinButtonProps["onChange"] = useCallback(
    (_ev: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
      console.log("onSpinButtonChange", data.value, data.displayValue)
      if (data.value !== undefined && data.value !== null) {
        setX(data.value)
      } else if (data.displayValue !== undefined) {
        const newValue = parseFloat(data.displayValue)
        if (!Number.isNaN(newValue)) {
          setX(newValue)
        } else {
          console.error(`Cannot parse "${data.displayValue}" as a number.`)
        }
      }
    },
    [setX]
  )
  const onChangeY: SpinButtonProps["onChange"] = useCallback(
    (_ev: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
      console.log("onSpinButtonChange", data.value, data.displayValue)
      if (data.value !== undefined && data.value !== null) {
        setY(data.value)
      } else if (data.displayValue !== undefined) {
        const newValue = parseFloat(data.displayValue)
        if (!Number.isNaN(newValue)) {
          setY(newValue)
        } else {
          console.error(`Cannot parse "${data.displayValue}" as a number.`)
        }
      }
    },
    [setY]
  )
  const onChangeZ: SpinButtonProps["onChange"] = useCallback(
    (_ev: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
      console.log("onSpinButtonChange", data.value, data.displayValue)
      if (data.value !== undefined && data.value !== null) {
        setZ(data.value)
      } else if (data.displayValue !== undefined) {
        const newValue = parseFloat(data.displayValue)
        if (!Number.isNaN(newValue)) {
          setZ(newValue)
        } else {
          console.error(`Cannot parse "${data.displayValue}" as a number.`)
        }
      }
    },
    [setZ]
  )

  return (
    <Field label="Position">
      <div className={styles.multiValueField}>
        <ValueField
          color={tokens.colorPaletteRedBackground3}
          label="X"
          value={x}
          onChange={onChangeX}
        />
        <ValueField
          color={tokens.colorPaletteLightGreenBackground3}
          label="Y"
          value={y}
          onChange={onChangeY}
        />
        <ValueField
          color={tokens.colorCompoundBrandStrokePressed}
          label="Z"
          value={z}
          onChange={onChangeZ}
        />
      </div>
    </Field>
  )
}
export default function InspectorToolbar() {
  const styles = useStyles()

  return (
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
        <VertexField />
      </DrawerBody>
    </DrawerInline>
  )
}
