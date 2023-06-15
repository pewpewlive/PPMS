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

type ValueFieldProps = Omit<SpinButtonProps, "onChange" | "value"> & {
  color: string
  label: string
  value: number
  onChange: (value: number) => void
}
/**
 * A field with a label and a SpinButton. The SpinButton's value is controlled by the `value` prop. The value functionality is completely self-managed with state.
 * Also, this changes state while typing, not just when the user presses enter using keyboard events since onChange is not called until the user presses enter.
 */
function ValueField({ onChange, color, label, value }: ValueFieldProps) {
  const styles = useStyles()
  const onChangeHandler = useCallback(
    (_ev: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
      if (data.value !== undefined && data.value !== null) {
        onChange(data.value)
      } else if (data.displayValue !== undefined) {
        const newValue = parseFloat(data.displayValue)
        if (!Number.isNaN(newValue)) {
          onChange(newValue)
        } else {
          console.error(`Cannot parse "${data.displayValue}" as a number.`)
        }
      }
    },
    [onChange]
  )
  const keyDownHandler = useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        !(
          (ev.key >= "0" && ev.key <= "9") ||
          ev.key === "." ||
          ev.key === "-" ||
          ev.key === "Backspace" ||
          ev.key === "Delete" ||
          ev.key === "ArrowLeft" ||
          ev.key === "ArrowRight"
        )
      ) {
        ev.preventDefault()
      }
    },
    []
  )
  return (
    <div
      className={styles.valueField}
      style={{ backgroundColor: color, borderRadius: "4.6px" }}
    >
      <Body1Stronger>{label}</Body1Stronger>
      <SpinButton
        appearance="filled-darker"
        size="small"
        value={value}
        onChange={onChangeHandler}
        max={10000}
        onKeyDown={keyDownHandler}
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

  return (
    <Field label="Position">
      <div className={styles.multiValueField}>
        <ValueField
          color={tokens.colorPaletteRedBackground3}
          label="X"
          value={x}
          onChange={setX}
        />
        <ValueField
          color={tokens.colorPaletteLightGreenBackground3}
          label="Y"
          value={y}
          onChange={setY}
        />
        <ValueField
          color={tokens.colorCompoundBrandStrokePressed}
          label="Z"
          value={z}
          onChange={setZ}
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
